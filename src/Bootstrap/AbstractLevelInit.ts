import { AbstractPhase } from "./AbstractPhase";
import { RCL1Structures } from "../RCLConstants";
import { isNumber } from "util";
import { Logger } from "../Logger";

export abstract class AbstractLevelInit extends AbstractPhase {

  public run(): void {
    this.runInit()
    this.roomMem.levelInit = true
  }

  protected abstract runInit(): void

  protected abstract fillBuildQueue(): void

  protected fillStructurePlan(toFill: number, type: string):void {
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
    }
    if (structurePlanMem !== undefined) {
      for (let i = 0; i < toFill; i++) {
        const coord = structurePlanMem.shift()
        if (coord !== undefined) {
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
