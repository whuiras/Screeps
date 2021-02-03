import { AbstractLevelInit} from "../AbstractLevelInit";
import { RCL2Structures } from "../../RCLConstants";
import { MemoryHandler } from "../../memory/MemoryHandler";

export class Stage2Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(MemoryHandler.getCapRoadLen(this.roomMem), "capRoads", STRUCTURE_ROAD)
    this.fillStructurePlan(12, "coreRoads", STRUCTURE_ROAD)
    this.fillStructurePlan(RCL2Structures.extensions, "extensions", STRUCTURE_EXTENSION)
  }



}
