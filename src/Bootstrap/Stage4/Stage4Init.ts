import { AbstractLevelInit } from "../AbstractLevelInit";

export class Stage4Init extends AbstractLevelInit {

  protected runInit(): void {
    this.fillBuildQueue();
  }

  protected fillBuildQueue(): void {
    this.fillStructurePlan(RCL4Structures.extensions, STRUCTURE_EXTENSION);
    this.fillStructurePlan(RCL4Structures.storage, STRUCTURE_STORAGE);
    this.fillStructurePlan(12, STRUCTURE_ROAD);
  }


}
