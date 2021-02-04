import { AbstractLevelInit } from "../AbstractLevelInit";
import { MemoryHandler } from "../../memory/MemoryHandler";

export class Stage3Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue();
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(MemoryHandler.getCapRoadLen(this.roomMem), "capRoads", STRUCTURE_ROAD);
    this.fillStructurePlan(12, "coreRoads", STRUCTURE_ROAD);
    this.fillStructurePlan(RCL2Structures.extensions, "extensions", STRUCTURE_EXTENSION);

    this.fillStructurePlan(RCL3Structures.extensions, STRUCTURE_EXTENSION);
    this.fillStructurePlan(RCL3Structures.towers, STRUCTURE_TOWER);
    this.fillStructurePlan(12, STRUCTURE_ROAD);
  }


}
