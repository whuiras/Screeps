import { AbstractLevelInit } from "../AbstractLevelInit";
import { RCL3Constants } from "../../RCLConstants/RCL3Constants";

export class Stage3Init extends AbstractLevelInit {

  private RCLConstants = new RCL3Constants();

  protected runInit(): void {
    this.fillBuildQueue(this.RCLConstants);
  }


}
