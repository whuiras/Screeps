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
  sources: Id<Source>[]
  spawn: string
  controller: string
  maxHarvesters: number
  roomPlan: RoomPlanMemory
  structures: RoomPlanMemory
  buildQueue: [number, number, string][]
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
}



