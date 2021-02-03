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
   * @param buildingPlanMem
   * @protected
   */
  protected fillStructurePlan(toFill: number, buildingPlanMem: keyof structMemory, type: BuildableStructureConstant):void {
    const structurePlanMem = this.roomMem.roomPlan[buildingPlanMem]
    const structMem = this.roomMem.structures[buildingPlanMem];

    if (structurePlanMem !== undefined) {

      for (let i = structMem.length; i < toFill; i++) {
        const coord = structurePlanMem[i]
        if (coord !== undefined) {
          const room: Room = Game.rooms[this.roomMem.id]
          const result = room.createConstructionSite(coord[0], coord[1], type);

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
          structMem.push([coord[0], coord[1]])

        } else {
          Logger.logError("Build plan coord is undefined")
        }
      }
    } else {
      Logger.logError("Could not get type of room plan memory")
    }
  }

}
