import { Stage1Upkeep } from "./Stage1/Stage1Upkeep";
import { Stage2Upkeep } from "./Stage2/Stage2Upkeep";
import { Stage1Main } from "./Stage1/Stage1Main";

export abstract class AbstractBootUpkeep {

  public workers : Creep[]
  public harvesters : Creep[]


  public constructor() {
    this.workers = []
    this.harvesters = []
  }


  public abstract run():void

  public updateCreeps():void {
    this.workers = _.filter(Game.creeps, (creep) => creep.memory.role === 'worker');

  }



}
