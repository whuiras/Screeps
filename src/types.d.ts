// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  upgrading?: boolean
}

interface Memory {
  uuid: number;
  log: any;
  rooms: RoomMemory[]
}

interface RoomMemory {
  id: string
  lastUpdated: number
  sources: SourceMemory[]
  spawn: string
}

interface SourceMemory {
  id: string
  availableWorkers: number
  currentWorkers: number
}


// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
