import { AbstractBootUpkeep } from "../Bootstrap/AbstractBootUpkeep";
import { AbstractBootMain } from "../Bootstrap/AbstractBootMain";
import { Stage1Upkeep } from "../Bootstrap/Stage1/Stage1Upkeep";
import { Stage1Main } from "../Bootstrap/Stage1/Stage1Main";
import { Stage2Upkeep } from "../Bootstrap/Stage2/Stage2Upkeep";
import { Stage2Main } from "../Bootstrap/Stage2/Stage2Main";

/**
 * The Bootstrap strategy runs on respawn (specifically when only 1 room is controlled, and it level 1)
 * Objectives for the bootstrapping process:
 */
export class BootstrapStrategy extends AbstractStrategy {

  public upkeep: AbstractBootUpkeep;
  public main: AbstractBootMain;
  public stage1Upkeep: Stage1Upkeep;
  public stage1Main: Stage1Main;
  public stage2Upkeep: Stage2Upkeep;
  public stage2Main: Stage2Main;


  public constructor() {
    super();
    this.stage1Upkeep = new Stage1Upkeep();
    this.stage1Main = new Stage1Main();
    this.stage2Upkeep = new Stage2Upkeep();
    this.stage2Main = new Stage2Main();
    this.upkeep = this.stage1Upkeep;
    this.main = this.stage1Main;
  }

  public execute(): void {
    if (Game.rooms[0].controller) {
      switch (Game.rooms[0].controller.level) {
        case 1:
          this.upkeep = this.stage1Upkeep
          this.main = this.stage1Main
          break;

        case 2:
          this.upkeep = this.stage2Upkeep
          this.main = this.stage2Main
          break;

        case 3:
          break;

        default:
          break;
      }

      this.upkeep.run();
      this.main.run();

    }
  }

}
