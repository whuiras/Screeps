import { AbstractLevelInit} from "../AbstractLevelInit";
import { RCL3Structures } from "../../RCLConstants";

export class Stage3Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(RCL3Structures.extensions, STRUCTURE_EXTENSION)
    this.fillStructurePlan(RCL3Structures.towers, STRUCTURE_TOWER)
    this.fillStructurePlan(12, STRUCTURE_ROAD)
  }


}
