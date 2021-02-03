import { AbstractBootUpkeep } from "../AbstractBootUpkeep";

export class Stage2Upkeep extends AbstractBootUpkeep {
  public run(): void {
    this.updateCreeps();


  }

}
