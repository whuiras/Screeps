interface CreepMemory {
  role: string;
  upgrading?: boolean
}

interface Memory {
  uuid: number;
  initialized: boolean
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


