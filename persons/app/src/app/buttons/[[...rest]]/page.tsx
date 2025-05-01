'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button, GroupLayout } from '@/components'
import { CardGroup } from '../components'

import { _ } from '@/utils'
import { api } from '@/api/react'
import { useAsyncEffect } from '@/hooks'

interface Props {
  params: {
    rest?: string[]
  }
}

export default ({ params }: Props) => {
  const { rest: [id] = [] } = params

  const router = useRouter()

  const [layout, setLayout] = useState<CommonGroupLayout.Item[]>([])

  const data = useMemo(() => {
    return layout.map(item => _.pick(item, ['i', 'w', 'h', 'x', 'y', 'data']))
  }, [layout])

  const createState = api.commonGroupLayout.create.useMutation()

  const updateState = api.commonGroupLayout.update.useMutation()

  const infoState = api.commonGroupLayout.findUnique.useQuery({
    where: { id },
  }, {
    enabled: !!id,
  })

  useEffect(() => {
    if (infoState.isLoading) {
      return
    }
    if (layout.length) {
      return
    }
    if (!infoState.data) {
      if (id) {
        router.push('/buttons')
      }
      return
    }
    setLayout(infoState.data?.data || [])
  }, [id, infoState, layout.length, router])

  useAsyncEffect(async () => {
    if (infoState.isLoading) {
      return
    }

    if (!id) {
      const res = await createState.mutateAsync({ data: { data } })
      if (res) {
        router.push(`/buttons/${res.id}`)
      }
      return
    }

    if (_.isEqual(data, infoState.data?.data?.map(item => _.pick(item, ['i', 'w', 'h', 'x', 'y', 'data'])))) {
      return
    }

    await updateState.mutateAsync({
      where: { id },
      data: { data },
    })
  }, [JSON.stringify(data)])

  const onAddGroup = () => {
    setLayout([...layout, {
      i: Date.now().toString(),
      w: 4, h: 2,
      x: 0, y: 0,
      data: {
        title: 'aaa',
      },
    }])
  }

  const onChangeName = (id: string, name: string) => {
    setLayout(layout.map(item => {
      if (item.i !== id) {
        return item
      }
      return {
        ...item,
        data: { ...item.data, title: name },
      }
    }))
  }

  return (
    <div className='p-2 w-full h-[100vh] flex flex-col'>
      <div className='flex justify-end'>
        <Button type='primary' onClick={onAddGroup}>
          添加分组
        </Button>
      </div>

      <div className='flex-1 mt-2'>
        <GroupLayout
          layout={layout}
          onChange={setLayout}
          renderItem={item => (
            <CardGroup
              item={item}
              onChangeName={onChangeName}
            />
          )}
        />
      </div>
    </div>
  )
}
