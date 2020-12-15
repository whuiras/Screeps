import { ErrorMapper } from "utils/ErrorMapper";
import {BootstrapStrategy} from "./mainStrategy/BootstrapStrategy";
import {RunStrategy} from "./mainStrategy/RunStrategy";
import { AbstractStrategy } from "./mainStrategy/AbstractStrategy";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  if (Game.time % 10 === 0) {
    console.log(`Current game tick is ${Game.time}`)
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  for (let i = 0; i < Object.keys(Game.rooms).length; i++) {
    Memory.rooms[i] = Object.values(Game.rooms)[i]
  }


  // Assign main algorithm
  let mainStrategy:AbstractStrategy = new RunStrategy()
  if (Object.keys(Game.rooms).length === 1) {
    const room = Object.values(Game.rooms).find((r) => r.controller && r.controller.my)

    if (room !== undefined && room.controller !== undefined && room.controller.level <= 4) {
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
