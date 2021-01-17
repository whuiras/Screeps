import { ErrorMapper } from "utils/ErrorMapper";
import { BootstrapStrategy } from "./mainStrategy/BootstrapStrategy";
import { RunStrategy } from "./mainStrategy/RunStrategy";
import { AbstractStrategy } from "./mainStrategy/AbstractStrategy";
import { MemoryHandler } from "./memory/MemoryHandler";
import { Logger } from "./Logger";

// global.profiler = Profiler.init();
const memoryHandler: MemoryHandler = new MemoryHandler();
const logger: Logger = new Logger(3);
const bootstrapStrategy: BootstrapStrategy = new BootstrapStrategy();
const runStrategy: RunStrategy = new RunStrategy();


export const loop = ErrorMapper.wrapLoop(() => {

  if (Game.time % 10 === 0) {
    console.log(`Current game tick is ${Game.time}`);
  }

  memoryHandler.updateMemory();

  // Assign main algorithm
  let strategy: AbstractStrategy = new RunStrategy();
  if (Object.keys(Game.rooms).length === 1) {
    const room = Object.values(Game.rooms).find((r) => r.controller && r.controller.my);

    if (room !== undefined && room.controller !== undefined && room.controller.level <= 9) {
      console.log("Bootstrapping");
      strategy = bootstrapStrategy;
    }

  } else {
    strategy = runStrategy;
  }

  if (strategy) {
    strategy.execute();
  }


});
