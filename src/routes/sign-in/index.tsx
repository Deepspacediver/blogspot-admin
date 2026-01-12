import { useSignIn } from "@/api/auth/query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/")({
  beforeLoad: ({ context: { user } }) => {
    if (user) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: signIn } = useSignIn();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          console.log({ email, password });
          signIn({
            password,
            email,
          });
        }}
      >
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button>Submit</button>
      </form>
    </div>
  );
}
