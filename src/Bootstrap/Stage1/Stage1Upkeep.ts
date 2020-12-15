const MIN_WORKERS = 3

export class Stage1Upkeep {

  public run():void {
    const workers = _.filter(Game.creeps, (creep) => creep.memory.role === 'worker');

    if(workers.length < MIN_WORKERS) {
      const newName = 'Worker' + Game.time.toString()
      console.log('Spawning new worker: ' + newName);
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {role: 'worker'} });
    }



  }

}
