import { EventTypes } from "./events";

export interface CertificateTypes {
  certificateID: string;
  fullName: string;
  isProjectComplete: boolean;
  event: EventTypes;
}
