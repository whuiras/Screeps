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
  levelInit: boolean
  id: string
  lastUpdated: number
  sources: SourceMemory[]
  spawn: string
  controller: string
  maxHarvesters: number
  roomPlan: RoomPlanMemory
}

interface RoomPlanMemory {
  containers: number[][]
  extensions: number[][]
  roads: number[][]
  towers: number[][]
  walls: number[][]
  ramparts: number[][]
  links: number[][]
  storage: number[][]
  spawns: number[][]
  extractors: number[][]
  labs: number[][]
  terminal: number[][]
  observer: number[][]
  powerSpawn: number[][]
  buildQueue: [number, number, string][]
}

interface SourceMemory {
  id: string
  availableWorkers: number
  currentWorkers: number
}


