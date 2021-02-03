import { AbstractLevelInit } from "../AbstractLevelInit";

export class Stage7Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue();
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(10, STRUCTURE_ROAD);
  }


}
