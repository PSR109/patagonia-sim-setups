import { AuthForm } from "@/components/auth-form";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/app";
  return <AuthForm mode="register" next={next} />;
}
