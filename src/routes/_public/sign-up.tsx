import SignUpForm from "@/features/auth/sign-up.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SignUpForm />
    </>
  );
}
