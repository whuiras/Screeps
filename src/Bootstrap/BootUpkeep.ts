import { Stage1Upkeep } from "./Stage1/Stage1Upkeep";
import { Stage2Upkeep } from "./Stage2/Stage2Upkeep";

export class BootUpkeep {


  public run():void {
    if (Game.rooms[0].controller) {
      switch(Game.rooms[0].controller.level) {
        case 1:
          break

        case 2:
          break

        case 3:
          break
      }
    }
  }



}
