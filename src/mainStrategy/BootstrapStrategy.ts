import { BootUpkeep } from "../Bootstrap/BootUpkeep";
import { BootMain } from "../Bootstrap/BootMain";

/**
 * The Bootstrap strategy runs on respawn (specifically when only 1 room is controlled, and it level 1)
 * Objectives for the bootstrapping process:
 */
export class BootstrapStrategy extends AbstractMainStrategy {

  public upkeep : BootUpkeep
  public main : BootMain

  public constructor() {
    super();
    this.upkeep = new BootUpkeep()
    this.main = new BootMain()
  }

  public execute() {
    this.upkeep.run()
    this.main.run()
  }

}
