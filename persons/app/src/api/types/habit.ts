import type { HabitGroup, HabitItem, HabitRecord } from '@prisma/client'
import { type calcStatus } from '../utils'

export enum HabitFrequencyType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export enum HabitProgressStatus {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Pending = 'pending',
  Doing = 'doing',
  Done = 'done',
  Failed = 'failed',
}

export enum HabitStatusMode {
  Habit = 'habit',
  Record = 'record',
}

declare global {
  export namespace Habit {
    export type Group = HabitGroup;
    export type Item = HabitItem;
    export type Record = HabitRecord;

    export import FrequencyType = HabitFrequencyType
    export import ProgressStatus = HabitProgressStatus
    export import StatusMode = HabitStatusMode

    export interface Frequency {
      type: HabitFrequencyType;
      weekDays?: number[];
      dayOfMonth?: number[];
    }

    export interface Count {
      total: number;
      single: number;
      times: number;
    }

    export interface Exec {
      time: string;
      count: number;
      feeling?: string;
    }

    export type ExecList = Exec[]

    export namespace RunTime {
      // 合并后的项目记录类型
      export type ItemRecord = HabitItem & {
        group: HabitGroup;
        status: ReturnType<typeof calcStatus>;
        record: null | HabitRecord & {
          progress?: number;
        };
      };

      export type GroupChildren = Habit.Group & {
        children: Habit.Item[];
      };
    }
  }
}
