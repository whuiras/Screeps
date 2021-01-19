import { AbstractPhase } from "./AbstractPhase";

export abstract class AbstractBootUpkeep extends AbstractPhase {

  public workers: Creep[];
  public minWorkers: number;
  public harvesters: Creep[];


  public constructor() {
    super();
    this.workers = [];
    this.harvesters = [];
    this.minWorkers = 4
  }

  public updateCreeps(): void {
    this.workers = _.filter(Game.creeps, (creep) => creep.memory.role === "worker");

  }

}
