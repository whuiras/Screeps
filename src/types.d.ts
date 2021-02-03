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
  roomPlan: structMemory
  structures: structMemory
  buildQueue: [number, number, string][]
}

interface structMemory {
  coreEdges: number[][]
  containers: number[][]
  extensions: number[][]
  roads: number[][]
  coreRoads: number[][]
  capRoads: number[][]
  towers: number[][]
  walls: number[][]
  ramparts: number[][]
  links: number[][]
  coreLinks: number[][]
  controllerLinks: number[][]
  sourceLinks: number[][]
  storage: number[][]
  spawns: number[][]
  extractors: number[][]
  labs: number[][]
  terminal: number[][]
  observer: number[][]
  powerSpawn: number[][]
}



