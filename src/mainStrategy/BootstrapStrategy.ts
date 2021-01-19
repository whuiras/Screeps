import { AbstractBootUpkeep } from "../Bootstrap/AbstractBootUpkeep";
import { AbstractBootMain } from "../Bootstrap/AbstractBootMain";
import { Stage1Upkeep } from "../Bootstrap/Stage1/Stage1Upkeep";
import { Stage1Main } from "../Bootstrap/Stage1/Stage1Main";
import { Stage2Upkeep } from "../Bootstrap/Stage2/Stage2Upkeep";
import { Stage2Main } from "../Bootstrap/Stage2/Stage2Main";
import { AbstractStrategy } from "./AbstractStrategy";
import { Stage1Init } from "../Bootstrap/Stage1/Stage1Init";
import { AbstractLevelInit } from "../Bootstrap/AbstractLevelInit";
import { Stage2Init } from "../Bootstrap/Stage2/Stage2Init";


/**
 * The Bootstrap strategy runs on respawn (specifically when only 1 room is controlled, and it level 1)
 * Objectives for the bootstrapping process:
 */
export class BootstrapStrategy extends AbstractStrategy {

  public upkeep: AbstractBootUpkeep;
  public main: AbstractBootMain;
  public init: AbstractLevelInit;
  public stage1Upkeep: Stage1Upkeep;
  public stage1Main: Stage1Main;
  public stage1Init: Stage1Init;
  public stage2Upkeep: Stage2Upkeep;
  public stage2Main: Stage2Main;
  public stage2Init: Stage2Init;

  public constructor() {
    super();
    this.stage1Upkeep = new Stage1Upkeep();
    this.stage1Main = new Stage1Main();
    this.stage1Init = new Stage1Init();
    this.stage2Upkeep = new Stage2Upkeep();
    this.stage2Main = new Stage2Main();
    this.stage2Init = new Stage2Init();
    this.upkeep = this.stage1Upkeep;
    this.main = this.stage1Main;
    this.init = this.stage1Init;
  }

  public execute(): void {
      const controller = Game.getObjectById(Memory.initRoom.controller as Id<StructureController>);
      if (controller) {

        switch (controller.level) {
          case 1:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;

          case 2:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;

          case 3:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;

          case 4:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;

            break;

          case 5:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;

            break;

          case 6:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;

            break;

          case 7:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;

          case 8:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;

          default:
            this.upkeep = this.stage1Upkeep;
            this.main = this.stage1Main;
            break;
        }
      }

    if (!Memory.initRoom.levelInit) {
      this.init.run();
    }
    this.upkeep.run();
    this.main.run();
  }
}

