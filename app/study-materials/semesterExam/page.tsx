import { redirect, RedirectType } from "next/navigation";

export default function LegacySemesterExamRedirectPage() {
  redirect("/study-materials/semester-exam", RedirectType.replace);
}
