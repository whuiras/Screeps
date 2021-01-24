import { AbstractLevelInit} from "../AbstractLevelInit";
import { RCL2Structures } from "../../RCLConstants";

export class Stage2Init extends AbstractLevelInit {

  protected runInit(): void {
    this.checkPreviousBuilds()
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(RCL2Structures.extensions, STRUCTURE_EXTENSION)
    this.fillStructurePlan(12, STRUCTURE_ROAD)
  }

  protected checkPreviousBuilds(): void {
    super.buildPreviousLevels(1)
  }

}
