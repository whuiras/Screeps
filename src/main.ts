import { ErrorMapper } from "utils/ErrorMapper";
import {BootstrapStrategy} from "./mainStrategy/BootstrapStrategy";
import {RunStrategy} from "./mainStrategy/RunStrategy";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  // Assign main algorithm
  let mainStrategy:AbstractStrategy = new RunStrategy()
  if (Object.keys(Game.rooms).length === 1) {
    const roomController = Game.rooms[0].controller
    if (roomController !== undefined && roomController.level <= 4) {
      mainStrategy = new BootstrapStrategy()
    }

  } else {
    mainStrategy = new RunStrategy()
  }

  if (mainStrategy) {
    mainStrategy.execute()
  }


});
