// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  upgrading?: boolean
}

interface Memory {
  uuid: number;
  log: any;
  rooms: Room[]
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
