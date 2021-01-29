import { AbstractPhase } from "./AbstractPhase";
import { Logger } from "../Logger";

export abstract class AbstractLevelInit extends AbstractPhase {

  public run(): void {
    this.runInit()
    this.roomMem.levelInit = true
  }

  protected abstract runInit(): void

  protected abstract fillBuildQueue(): void

  /**
   *
   *
   * Notes: getting references to room memory should be done in the memory handler, not here.
   *
   * @param toFill The number of building to add up to
   * @param type The type of building to add to the queue
   * @protected
   */
  protected fillStructurePlan(toFill: number, type: BuildableStructureConstant):void {
    let structurePlanMem
    let structMem = [];
    switch (type) {
      case STRUCTURE_ROAD:
        structurePlanMem = this.roomMem.roomPlan.roads;
        structMem = this.roomMem.structures.roads;
        break;

      case STRUCTURE_CONTAINER:
        structurePlanMem = this.roomMem.roomPlan.containers;
        structMem = this.roomMem.structures.containers;
        break;

      case STRUCTURE_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.spawns;
        structMem = this.roomMem.structures.spawns;
        break;

      case STRUCTURE_EXTENSION:
        structurePlanMem = this.roomMem.roomPlan.extensions;
        structMem = this.roomMem.structures.extensions;
        break;

      case STRUCTURE_RAMPART:
        structurePlanMem = this.roomMem.roomPlan.ramparts;
        structMem = this.roomMem.structures.ramparts;
        break;

      case STRUCTURE_WALL:
        structurePlanMem = this.roomMem.roomPlan.walls;
        structMem = this.roomMem.structures.walls;
        break;

      case STRUCTURE_TOWER:
        structurePlanMem = this.roomMem.roomPlan.towers;
        structMem = this.roomMem.structures.towers;
        break;

      case STRUCTURE_STORAGE:
        structurePlanMem = this.roomMem.roomPlan.storage;
        structMem = this.roomMem.structures.storage;
        break;

      case STRUCTURE_LINK:
        structurePlanMem = this.roomMem.roomPlan.links;
        structMem = this.roomMem.structures.links;
        break;

      case STRUCTURE_EXTRACTOR:
        structurePlanMem = this.roomMem.roomPlan.extractors;
        structMem = this.roomMem.structures.extractors;
        break;

      case STRUCTURE_LAB:
        structurePlanMem = this.roomMem.roomPlan.labs;
        structMem = this.roomMem.structures.labs;
        break;

      case STRUCTURE_TERMINAL:
        structurePlanMem = this.roomMem.roomPlan.terminal;
        structMem = this.roomMem.structures.terminal;
        break;

      case STRUCTURE_OBSERVER:
        structurePlanMem = this.roomMem.roomPlan.observer;
        structMem = this.roomMem.structures.observer;
        break;

      case STRUCTURE_POWER_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.powerSpawn;
        structMem = this.roomMem.structures.powerSpawn;
        break;

      default:
        structurePlanMem = undefined
        break;
    }
    if (structurePlanMem !== undefined) {

      for (let i = structMem.length; i < toFill; i++) {
        const coord = structurePlanMem[i]
        if (coord !== undefined) {
          const room: Room = Game.rooms[this.roomMem.id]
          const result = room.createConstructionSite(coord[0], coord[1], type)

          // Check to see if we can build at the coordinates
          // If not, grab another coordinate off the build plan
          if (result !== OK) {
            Logger.logWarn(
              "Could not create construction site at [" +
              coord[0].toString() + ',' + coord[1].toString() + ']')
            Logger.logWarn("Returned error code: " + result.toString())
            i--;
            continue;
          }
          this.roomMem.buildQueue.push([coord[0], coord[1], type])
          structMem.push(coord[0], coord[1])

        } else {
          Logger.logError("Build plan coord is undefined")
        }
      }
    } else {
      Logger.logError("Could not get type of room plan memory")
    }
  }

}
