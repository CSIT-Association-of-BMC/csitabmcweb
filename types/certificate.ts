import { EventTypes } from "./events";

export interface CertificateTypes {
  id?: number | string;
  certificateID: string;
  certificate_id?: string;
  fullName: string;
  full_name?: string;
  isProjectComplete?: boolean;
  is_project_completed?: boolean;
  event: EventTypes;
  event_title?: string;
  issued_at?: string;
  president_name?: string | null;
  president_signature_url?: string | null;
}
