import { ErrorMapper } from "utils/ErrorMapper";
import {BootstrapStrategy} from "./mainStrategy/BootstrapStrategy";
import {RunStrategy} from "./mainStrategy/RunStrategy";
import { AbstractStrategy } from "./mainStrategy/AbstractStrategy";
import { MemoryHandler } from "./memory/MemoryHandler";
import { Logger } from "./Logger";


const memoryHandler : MemoryHandler = new MemoryHandler()

export const loop = ErrorMapper.wrapLoop(() => {

  if (Game.time % 10 === 0) {
    console.log(`Current game tick is ${Game.time}`)
  }

  if (Memory.initialized !== true) {
    const logger = new Logger(3)
    Memory.initialized = true
  }

  memoryHandler.updateMemory()

  // Assign main algorithm
  let mainStrategy:AbstractStrategy = new RunStrategy()
  if (Object.keys(Game.rooms).length === 1) {
    const room = Object.values(Game.rooms).find((r) => r.controller && r.controller.my)

    if (room !== undefined && room.controller !== undefined && room.controller.level <= 9) {
      console.log("Bootstrapping")
      mainStrategy = new BootstrapStrategy()
    }

  } else {
    mainStrategy = new RunStrategy()
  }

  if (mainStrategy) {
    mainStrategy.execute()
  }


});
