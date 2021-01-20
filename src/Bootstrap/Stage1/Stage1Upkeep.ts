import { AbstractBootUpkeep } from "../AbstractBootUpkeep";

const MIN_WORKERS = 3

export class Stage1Upkeep extends AbstractBootUpkeep{

  public run():void {
    this.updateCreeps()

    if(this.workers.length < MIN_WORKERS) {
      const newName = 'Worker' + Game.time.toString()
      console.log('Spawning new worker: ' + newName);
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'worker', upgrading: false} });
    }


  }

  protected updateBuildQueue(): void {


  }

}
