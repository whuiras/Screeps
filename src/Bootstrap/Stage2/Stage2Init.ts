import { AbstractLevelInit } from "../AbstractLevelInit";
import { RCL2Constants } from "../../RCLConstants/RCL2Constants";

export class Stage2Init extends AbstractLevelInit {

  private RCLConstants = new RCL2Constants();

  protected runInit(): void {
    this.fillBuildQueue(this.RCLConstants);
  }



}
