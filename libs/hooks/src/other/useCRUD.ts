import { useState } from 'react'
import { useRequest } from 'ahooks'

export interface ApiResult<D = any> {
  status?: string;
  message?: string;
  success?: boolean;
  data?: D;
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
}

export enum CRUDAction {
  Info = 'info',
  List = 'list',
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}

type InfoAPI<I> = (id: string) => Promise<ApiResult<I>>
type ListAPI<I> = (params?: any) => Promise<ApiResult<I[]>>
type CreateAPI<I> = (data: any) => Promise<ApiResult<I>>
type UpdateAPI<I> = (id: string, data: any) => Promise<ApiResult<I>>
type DeleteAPI<I> = (id: string) => Promise<ApiResult<I>>

interface Apis<I> {
  [CRUDAction.Info]?: InfoAPI<I>;
  [CRUDAction.List]?: ListAPI<I>;
  [CRUDAction.Create]?: CreateAPI<I>;
  [CRUDAction.Update]?: UpdateAPI<I>;
  [CRUDAction.Delete]?: DeleteAPI<I>;
}

interface AutoRefreshList {
  [CRUDAction.Info]?: boolean;
  [CRUDAction.List]?: boolean;
  [CRUDAction.Create]?: boolean;
  [CRUDAction.Update]?: boolean;
  [CRUDAction.Delete]?: boolean;
}

interface CRUDOptions<I> {
  id?: string;
  apis: Apis<I>;
  autoRefreshList?: boolean | AutoRefreshList;
  convertInfo?: (data?: I) => any;
  replaceLocation?: boolean;
  autoFetchList?: boolean;
  debounceWait?: number;
  onSuccess?: (action: CRUDAction, data?: any) => void;
}

export function useCRUD<I extends { id: string }>(options: CRUDOptions<I>) {
  const {
    id,
    apis,
    autoRefreshList = true,
    autoFetchList = false,
    replaceLocation = false,
    convertInfo = (data) => data,
    onSuccess = () => undefined,
    debounceWait = 300,
  } = options

  const [list, setList] = useState<I[]>([])
  const [info, setInfo] = useState<I>()

  const shouldRefresh = (action: CRUDAction, autoRefreshList: boolean | AutoRefreshList) => {
    if (typeof autoRefreshList === 'boolean') {
      return autoRefreshList
    }
    return autoRefreshList[action]
  }

  const infoState = useRequest(apis.info as InfoAPI<I>, {
    ready: !!id,
    defaultParams: [id as string],
    debounceWait,
    onSuccess: (res) => {
      const convertedInfo = convertInfo(res.data)
      setInfo(convertedInfo)
      onSuccess(CRUDAction.Info, convertedInfo)
    },
  })

  const listState = useRequest(apis.list as unknown as ListAPI<I>, {
    manual: !autoFetchList,
    debounceWait,
    onSuccess: (res) => {
      const convertedList = res.data?.map(convertInfo)
      setList(convertedList || [])
      onSuccess(CRUDAction.List, convertedList)
    },
  })

  const createState = useRequest(apis.create as CreateAPI<I>, {
    manual: true,
    debounceWait,
    onSuccess: (res) => {
      if (shouldRefresh(CRUDAction.Create, autoRefreshList)) {
        listState.run()
      }
      onSuccess(CRUDAction.Create, res.data)
    },
  })

  const updateState = useRequest(apis.update as UpdateAPI<I>, {
    manual: true,
    debounceWait,
    onSuccess: (res) => {
      if (shouldRefresh(CRUDAction.Update, autoRefreshList)) {
        listState.run()
      }
      onSuccess(CRUDAction.Update, res.data)
    },
  })

  const deleteState = useRequest(apis.delete as DeleteAPI<I>, {
    manual: true,
    debounceWait,
    onSuccess: (res) => {
      if (shouldRefresh(CRUDAction.Delete, autoRefreshList)) {
        listState.run()
      }
      onSuccess(CRUDAction.Delete, res.data)
    },
  })

  const onSave = async (data: I & { id?: string }) => {
    if (data.id) {
      updateState.run(data.id, data)
    } else {
      createState.run(data)
    }
  }

  return {
    info,
    list,

    infoState,
    listState,
    createState,
    updateState,
    deleteState,

    onSave,

    apis,

    loading: infoState.loading || listState.loading || createState.loading || updateState.loading || deleteState.loading,
  }
}
