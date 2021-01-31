import { AbstractLevelInit} from "../AbstractLevelInit";

export class Stage9Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(10, STRUCTURE_ROAD)
  }


}
