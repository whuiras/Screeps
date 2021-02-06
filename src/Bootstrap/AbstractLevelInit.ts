import { AbstractPhase } from "./AbstractPhase";
import { Logger } from "../Logger";
import { MemoryHandler } from "../memory/MemoryHandler";
import { AbstractRCLConstants } from "../RCLConstants/AbstractRCLConstants";

export abstract class AbstractLevelInit extends AbstractPhase {

  public run(): void {
    this.runInit();
    this.roomMem.levelInit = true;
  }

  protected abstract runInit(): void

  protected fillBuildQueue(constants: AbstractRCLConstants): void {
    this.fillStructurePlan(MemoryHandler.getCapRoadLen(this.roomMem), "capRoads", STRUCTURE_ROAD);
    this.fillStructurePlan(constants.roads, "coreRoads", STRUCTURE_ROAD);
    this.fillStructurePlan(constants.extensions, "extensions", STRUCTURE_EXTENSION);
    this.fillStructurePlan(constants.spawns, "spawns", STRUCTURE_SPAWN);
    this.fillStructurePlan(constants.containers, "containers", STRUCTURE_EXTENSION);
    this.fillStructurePlan(constants.ramparts, "ramparts", STRUCTURE_RAMPART);
    this.fillStructurePlan(constants.towers, "towers", STRUCTURE_TOWER);
    this.fillStructurePlan(constants.storage, "extensions", STRUCTURE_EXTENSION);
    this.fillStructurePlan(constants.coreLinks, "coreLinks", STRUCTURE_LINK);
    this.fillStructurePlan(constants.sourceLinks, "sourceLinks", STRUCTURE_LINK);
    this.fillStructurePlan(constants.controllerLinks, "controllerLinks", STRUCTURE_LINK);
    this.fillStructurePlan(constants.extractor, "extractors", STRUCTURE_EXTRACTOR);
    this.fillStructurePlan(constants.labs, "labs", STRUCTURE_LAB);
    this.fillStructurePlan(constants.terminal, "terminal", STRUCTURE_TERMINAL);
    this.fillStructurePlan(constants.observer, "observer", STRUCTURE_OBSERVER);
    this.fillStructurePlan(constants.powerSpawn, "powerSpawn", STRUCTURE_POWER_SPAWN);
  }

  /**
   *
   *
   * Notes: getting references to room memory should be done in the memory handler, not here.
   *
   * @param toFill The number of building to add up to
   * @param buildingPlanMem The type of structure in memory
   * @param type The type of structure to build
   * @protected
   */
  protected fillStructurePlan(toFill: number, buildingPlanMem: keyof structMemory, type: BuildableStructureConstant): void {
    const structurePlanMem = this.roomMem.roomPlan[buildingPlanMem];
    const structMem = this.roomMem.structures[buildingPlanMem];

    if (structurePlanMem !== undefined) {

      for (let i = structMem.length; i < toFill; i++) {
        const coord = structurePlanMem[i];
        if (coord !== undefined) {
          const room: Room = Game.rooms[this.roomMem.id];
          const result = room.createConstructionSite(coord[0], coord[1], type);

          // Check to see if we can build at the coordinates
          // If not, grab another coordinate off the build plan
          if (result !== OK) {
            Logger.logWarn(
              "Could not create construction site at [" +
              coord[0].toString() + "," + coord[1].toString() + "]");
            Logger.logWarn("Returned error code: " + result.toString());
            // i--;
            continue;
          }
          this.roomMem.buildQueue.push([coord[0], coord[1], type]);
          structMem.push([coord[0], coord[1]]);

        } else {
          Logger.logError("Build plan coord is undefined");
        }
      }
    } else {
      Logger.logError("Could not get type of room plan memory");
    }
  }

}
