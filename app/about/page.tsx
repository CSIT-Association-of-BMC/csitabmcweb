import { redirect, RedirectType } from "next/navigation";

export default function AboutRedirect() {
  redirect("/about/csitabmc", RedirectType.replace);
}
