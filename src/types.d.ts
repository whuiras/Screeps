import { Logger } from "tslog";

export const log: Logger


// memory extension samples
interface CreepMemory {
  role: string;
  upgrading?: boolean
}

interface Memory {
  uuid: number;
  log: any;
  initRoom: RoomMemory
  rooms: RoomMemory[]
}

interface RoomMemory {
  init: boolean
  id: string
  lastUpdated: number
  sources: SourceMemory[]
  spawn: string
  controller: string
  maxHarvesters: number
}

interface SourceMemory {
  id: string
  availableWorkers: number
  currentWorkers: number
}


