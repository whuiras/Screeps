import { AbstractPhase } from "./AbstractPhase";
import { Logger } from "../Logger";

export abstract class AbstractLevelInit extends AbstractPhase {

  public run(): void {
    this.runInit()
    this.roomMem.levelInit = true
  }

  protected abstract runInit(): void

  protected abstract fillBuildQueue(): void

  protected fillStructurePlan(toFill: number, type: BuildableStructureConstant):void {
    let structurePlanMem
    let extantCount = 0;
    switch (type) {
      case STRUCTURE_ROAD:
        structurePlanMem = this.roomMem.roomPlan.roads;
        extantCount = this.roomMem.structures.roads.length;
        break;

      case STRUCTURE_CONTAINER:
        structurePlanMem = this.roomMem.roomPlan.containers;
        extantCount = this.roomMem.structures.containers.length;
        break;

      case STRUCTURE_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.spawns;
        extantCount = this.roomMem.structures.spawns.length;
        break;

      case STRUCTURE_EXTENSION:
        structurePlanMem = this.roomMem.roomPlan.extensions;
        extantCount = this.roomMem.structures.extensions.length;
        break;

      case STRUCTURE_RAMPART:
        structurePlanMem = this.roomMem.roomPlan.ramparts;
        extantCount = this.roomMem.structures.ramparts.length;
        break;

      case STRUCTURE_WALL:
        structurePlanMem = this.roomMem.roomPlan.walls;
        extantCount = this.roomMem.structures.walls.length;
        break;

      case STRUCTURE_TOWER:
        structurePlanMem = this.roomMem.roomPlan.towers;
        extantCount = this.roomMem.structures.towers.length;
        break;

      case STRUCTURE_STORAGE:
        structurePlanMem = this.roomMem.roomPlan.storage;
        extantCount = this.roomMem.structures.storage.length;
        break;

      case STRUCTURE_LINK:
        structurePlanMem = this.roomMem.roomPlan.links;
        extantCount = this.roomMem.structures.links.length;
        break;

      case STRUCTURE_EXTRACTOR:
        structurePlanMem = this.roomMem.roomPlan.extractors;
        extantCount = this.roomMem.structures.extractors.length;
        break;

      case STRUCTURE_LAB:
        structurePlanMem = this.roomMem.roomPlan.labs;
        extantCount = this.roomMem.structures.labs.length;
        break;

      case STRUCTURE_TERMINAL:
        structurePlanMem = this.roomMem.roomPlan.terminal;
        extantCount = this.roomMem.structures.terminal.length;
        break;

      case STRUCTURE_OBSERVER:
        structurePlanMem = this.roomMem.roomPlan.observer;
        extantCount = this.roomMem.structures.observer.length;
        break;

      case STRUCTURE_POWER_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.powerSpawn;
        extantCount = this.roomMem.structures.powerSpawn.length;
        break;

      default:
        structurePlanMem = undefined
        break;
    }
    if (structurePlanMem !== undefined) {

      for (let i = extantCount; i < toFill; i++) {
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
        } else {
          Logger.logError("Build plan coord is undefined")
        }
      }
    } else {
      Logger.logError("Could not get type of room plan memory")
    }
  }

}
