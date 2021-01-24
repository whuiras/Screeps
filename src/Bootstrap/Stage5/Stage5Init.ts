import { AbstractLevelInit} from "../AbstractLevelInit";
import { RCL5Structures } from "../../RCLConstants";

export class Stage5Init extends AbstractLevelInit {

  protected runInit(): void {
    this.checkPreviousBuilds()
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(RCL5Structures.extensions, STRUCTURE_EXTENSION)
    this.fillStructurePlan(RCL5Structures.links, STRUCTURE_LINK)
    this.fillStructurePlan(10, STRUCTURE_ROAD)
  }

  protected checkPreviousBuilds(): void {
    super.buildPreviousLevels(4)
  }

}
