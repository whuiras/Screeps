import { AbstractPhase } from "./AbstractPhase";
import { Logger } from "../Logger";
import { Stage1Init } from "./Stage1/Stage1Init";
import { Stage2Init } from "./Stage2/Stage2Init";
import { Stage3Init } from "./Stage3/Stage3Init";
import { Stage4Init } from "./Stage4/Stage4Init";
import { Stage5Init } from "./Stage5/Stage5Init";
import { Stage6Init } from "./Stage6/Stage6Init";
import { Stage7Init } from "./Stage7/Stage7Init";
import { Stage8Init } from "./Stage8/Stage8Init";

export abstract class AbstractLevelInit extends AbstractPhase {

  public run(): void {
    this.runInit()
    this.roomMem.levelInit = true
  }

  /*
  protected buildPreviousLevels(upTo: number): void {
    for (let i = 0; i <= upTo; i++) {
      if (!this.roomMem.roomPlan.levelBuilt[i]) {
        // build the level
        // It would be great if I could use static methods here, though they are dependant on roomMemory. :(
        let initInstance: AbstractLevelInit | undefined
        switch (i) {
          case 1:
            initInstance = new Stage1Init(this.roomMem.id as Id<Room>)
            break;
          case 2:
            initInstance = new Stage2Init(this.roomMem.id as Id<Room>)
            break;
          case 3:
            initInstance = new Stage3Init(this.roomMem.id as Id<Room>)
            break;
          case 4:
            initInstance = new Stage4Init(this.roomMem.id as Id<Room>)
            break;
          case 5:
            initInstance = new Stage5Init(this.roomMem.id as Id<Room>)
            break;
          case 6:
            initInstance = new Stage6Init(this.roomMem.id as Id<Room>)
            break;
          case 7:
            initInstance = new Stage7Init(this.roomMem.id as Id<Room>)
            break;
          case 8:
            initInstance = new Stage8Init(this.roomMem.id as Id<Room>)
            break;
          default:
            initInstance = undefined
        }
        if (initInstance !== undefined) {
          initInstance.fillBuildQueue()
        } else {
          Logger.logError("buildPreviousLevels() received invalid level literal")
        }
      }
    }
  }

  /**
   * Calls buildPreviousLevels from the subclass, passing on upTo parameter
   * @protected
   */

  /*
  protected abstract checkPreviousBuilds(): void
*/

  protected abstract runInit(): void

  protected abstract fillBuildQueue(): void

  protected fillStructurePlan(toFill: number, type: BuildableStructureConstant):void {
    let structurePlanMem
    switch (type) {
      case STRUCTURE_ROAD:
        structurePlanMem = this.roomMem.roomPlan.roads;
        break;

      case STRUCTURE_CONTAINER:
        structurePlanMem = this.roomMem.roomPlan.containers;
        break;

      case STRUCTURE_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.spawns;
        break;

      case STRUCTURE_EXTENSION:
        structurePlanMem = this.roomMem.roomPlan.extensions;
        break;

      case STRUCTURE_RAMPART:
        structurePlanMem = this.roomMem.roomPlan.ramparts;
        break;

      case STRUCTURE_WALL:
        structurePlanMem = this.roomMem.roomPlan.walls;
        break;

      case STRUCTURE_TOWER:
        structurePlanMem = this.roomMem.roomPlan.towers;
        break;

      case STRUCTURE_STORAGE:
        structurePlanMem = this.roomMem.roomPlan.storage;
        break;

      case STRUCTURE_LINK:
        structurePlanMem = this.roomMem.roomPlan.links;
        break;

      case STRUCTURE_EXTRACTOR:
        structurePlanMem = this.roomMem.roomPlan.extractors;
        break;

      case STRUCTURE_LAB:
        structurePlanMem = this.roomMem.roomPlan.labs;
        break;

      case STRUCTURE_TERMINAL:
        structurePlanMem = this.roomMem.roomPlan.terminal;
        break;

      case STRUCTURE_OBSERVER:
        structurePlanMem = this.roomMem.roomPlan.observer;
        break;

      case STRUCTURE_POWER_SPAWN:
        structurePlanMem = this.roomMem.roomPlan.powerSpawn;
        break;

      default:
        structurePlanMem = undefined
        break;
    }
    if (structurePlanMem !== undefined) {
      for (let i = 0; i < toFill; i++) {
        const coord = structurePlanMem.shift()
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
          this.roomMem.roomPlan.buildQueue.push([coord[0], coord[1], type])
        } else {
          Logger.logError("Build plan coord is undefined")
        }
      }
    } else {
      Logger.logError("Could not get type of room plan memory")
    }
  }

}
