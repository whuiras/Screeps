import { AbstractLevelInit} from "../AbstractLevelInit";
import { RCL4Structures } from "../../RCLConstants";

export class Stage4Init extends AbstractLevelInit {

  protected runInit(): void {
    this.checkPreviousBuilds()
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(RCL4Structures.extensions, STRUCTURE_EXTENSION)
    this.fillStructurePlan(RCL4Structures.storage, STRUCTURE_STORAGE)
    this.fillStructurePlan(12, STRUCTURE_ROAD)
  }

  protected checkPreviousBuilds(): void {
    super.buildPreviousLevels(3)
  }

}
