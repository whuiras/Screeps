import { AbstractLevelInit} from "../AbstractLevelInit";

export class Stage3Init extends AbstractLevelInit {

  protected runInit(): void {
    this.checkPreviousBuilds()
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(10, STRUCTURE_ROAD)
  }

  protected checkPreviousBuilds(): void {
    super.buildPreviousLevels(2)
  }

}
