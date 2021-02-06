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
import { MemoryHandler } from "../memory/MemoryHandler";
import { Logger } from "../Logger";


/**
 * The Bootstrap strategy runs on respawn (specifically when only 1 room is controlled, and it level 1)
 * Objectives for the bootstrapping process:
 */
export class BootstrapStrategy extends AbstractStrategy {

  public upkeep: AbstractBootUpkeep;
  public main: AbstractBootMain;
  public init: AbstractLevelInit;
  public stage1Upkeep: AbstractBootUpkeep;
  public stage1Main: AbstractBootMain;
  public stage1Init: AbstractLevelInit;
  public stage2Upkeep: AbstractBootUpkeep;
  public stage2Main: AbstractBootMain;
  public stage2Init: AbstractLevelInit;
  public stage3Upkeep: AbstractBootUpkeep;
  public stage3Main: AbstractBootMain;
  public stage3Init: AbstractLevelInit;
  public stage4Upkeep: AbstractBootUpkeep;
  public stage4Main: AbstractBootMain;
  public stage4Init: AbstractLevelInit;
  public stage5Upkeep: AbstractBootUpkeep;
  public stage5Main: AbstractBootMain;
  public stage5Init: AbstractLevelInit;
  public stage6Upkeep: AbstractBootUpkeep;
  public stage6Main: AbstractBootMain;
  public stage6Init: AbstractLevelInit;
  public stage7Upkeep: AbstractBootUpkeep;
  public stage7Main: AbstractBootMain;
  public stage7Init: AbstractLevelInit;
  public stage8Upkeep: AbstractBootUpkeep;
  public stage8Main: AbstractBootMain;
  public stage8Init: AbstractLevelInit;
  public stage9Upkeep: AbstractBootUpkeep;
  public stage9Main: AbstractBootMain;
  public stage9Init: AbstractLevelInit;

  // These need to be updated as new mains and upkeeps are written
  public constructor() {
    super();
    this.stage1Upkeep = new Stage1Upkeep();
    this.stage1Main = new Stage1Main();
    this.stage1Init = new Stage1Init();
    this.stage2Upkeep = new Stage1Upkeep();
    this.stage2Main = new Stage1Main();
    this.stage2Init = new Stage1Init();
    this.stage3Upkeep = new Stage1Upkeep();
    this.stage3Main = new Stage1Main();
    this.stage3Init = new Stage2Init();
    this.stage4Upkeep = new Stage1Upkeep();
    this.stage4Main = new Stage1Main();
    this.stage4Init = new Stage2Init();
    this.stage5Upkeep = new Stage1Upkeep();
    this.stage5Main = new Stage1Main();
    this.stage5Init = new Stage2Init();
    this.stage6Upkeep = new Stage1Upkeep();
    this.stage6Main = new Stage1Main();
    this.stage6Init = new Stage2Init();
    this.stage7Upkeep = new Stage1Upkeep();
    this.stage7Main = new Stage1Main();
    this.stage7Init = new Stage2Init();
    this.stage8Upkeep = new Stage1Upkeep();
    this.stage8Main = new Stage1Main();
    this.stage8Init = new Stage2Init();
    this.stage9Upkeep = new Stage1Upkeep();
    this.stage9Main = new Stage1Main();
    this.stage9Init = new Stage2Init();
    this.upkeep = this.stage1Upkeep;
    this.main = this.stage1Main;
    this.init = this.stage1Init;
  }

  public execute(): void {
    for (const roomID of Object.keys(Game.rooms)) {
      const roomMem = MemoryHandler.getRoomMem(roomID as Id<Room>);
      if (roomMem) {
        this.setPhaseRoomMemory(roomMem);

        const controller = Game.getObjectById(roomMem.controller as Id<StructureController>);
        if (controller) {

          // assign correct stage for every phase
          switch (controller.level) {
            case 1:
              this.init = this.stage1Init;
              this.upkeep = this.stage1Upkeep;
              this.main = this.stage1Main;
              break;

            case 2:
              this.init = this.stage2Init;
              this.upkeep = this.stage2Upkeep;
              this.main = this.stage2Main;
              break;

            case 3:
              this.init = this.stage3Init;
              this.upkeep = this.stage3Upkeep;
              this.main = this.stage3Main;
              break;

            case 4:
              this.init = this.stage4Init;
              this.upkeep = this.stage4Upkeep;
              this.main = this.stage4Main;
              break;

            case 5:
              this.init = this.stage5Init;
              this.upkeep = this.stage5Upkeep;
              this.main = this.stage5Main;
              break;

            case 6:
              this.init = this.stage6Init;
              this.upkeep = this.stage6Upkeep;
              this.main = this.stage6Main;
              break;

            case 7:
              this.init = this.stage7Init;
              this.upkeep = this.stage7Upkeep;
              this.main = this.stage7Main;
              break;

            case 8:
              this.init = this.stage8Init;
              this.upkeep = this.stage8Upkeep;
              this.main = this.stage8Main;
              break;

            default:
              this.init = this.stage9Init;
              this.upkeep = this.stage9Upkeep;
              this.main = this.stage9Main;
              break;
          }
        }

        if (!roomMem.levelInit) {
          this.init.run();
        }
        this.init.run();
        this.upkeep.run();
        this.main.run();
      } else {
        Logger.logError("Room memory not found (BootstrapStrategy.execute())");
      }
    }
  }

  private setPhaseRoomMemory(roomMem: RoomMemory) {
    this.init.roomMem = roomMem;
    this.upkeep.roomMem = roomMem;
    this.main.roomMem = roomMem;
  }
}

