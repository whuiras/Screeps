import { AbstractPhase } from "./AbstractPhase";

export abstract class AbstractBootMain extends AbstractPhase {

  public printStatus(): void {
    if (Game.spawns.Spawn1.spawning) {
      const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name];
      Game.spawns.Spawn1.room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        Game.spawns.Spawn1.pos.x + 1,
        Game.spawns.Spawn1.pos.y,
        { align: "left", opacity: 0.8 });
    }
  }

}
