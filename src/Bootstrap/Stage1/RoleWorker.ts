export const RoleWorker =
{

  run(creep: Creep): void {
    if(creep.memory.upgrading && creep.store.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.upgrading && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }


    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }

    else {
      const sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }

}
