import { getIsLoggedIn } from "@/lib/local-storage-helpers";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
  beforeLoad: ({ context: { user } }) => {
    if (user || getIsLoggedIn()) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
