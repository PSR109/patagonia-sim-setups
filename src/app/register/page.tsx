import { redirect } from "next/navigation";

// El registro está deshabilitado (app privada, un solo dueño). Mandamos a login.
export default function RegisterPage() {
  redirect("/login");
}
