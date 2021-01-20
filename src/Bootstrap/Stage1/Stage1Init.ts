import { AbstractLevelInit} from "../AbstractLevelInit";
import * as RCLConstants from "RCLConstants"

export class Stage1Init extends AbstractLevelInit {



  protected run(): void {
    this.fillBuildQueue()
  }

  protected fillBuildQueue(): void {
    for (let i = 0; i < 5; i++) {

    }
  }


}
