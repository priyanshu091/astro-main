import { redirect } from "next/navigation";

/**
 * Panchang is temporarily hidden and disabled.
 * Redirect any direct visits to the homepage.
 */
export default function PanchangPage() {
  redirect("/");
}
