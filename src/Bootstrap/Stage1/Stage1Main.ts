import { AbstractBootMain } from "../AbstractBootMain";
import { RoleWorker } from "./RoleWorker";

export class Stage1Main extends AbstractBootMain{

  public run(): void {

    this.printStatus()

    for(const name in Game.creeps) {
      const creep = Game.creeps[name];

      switch(creep.memory.role) {

        case "worker":
          RoleWorker.run(creep);
          break;
      }

    }

  }

}
