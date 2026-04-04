import { getUserDetails, type UserDetailsReturn } from "@/api/users/fetch";
import { getIsLoggedIn, setIsLoggedIn } from "@/lib/local-storage-helpers";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: UserDetailsReturn;
}>()({
  component: RootComponent,
  beforeLoad: async ({ context: { user, queryClient } }) => {
    const isLoggedInLocalStorage = getIsLoggedIn();
    const isOnSignRoutes = ["/sign-in", "/sign-up"].includes(location.pathname);

    if (!isLoggedInLocalStorage && !isOnSignRoutes) {
      throw redirect({ to: "/sign-in" });
    }

    const isPartiallyLogged =
      (!user && isLoggedInLocalStorage) || (!isLoggedInLocalStorage && user);
    if (isPartiallyLogged) {
      try {
        const userData = await queryClient.ensureQueryData({
          queryKey: ["user"],
          queryFn: getUserDetails,
          retry: false,
        });
        return {
          user: userData satisfies UserDetailsReturn,
        };
      } catch {
        setIsLoggedIn(false);
        throw redirect({ to: "/sign-in" });
      }
    }
  },
});

function RootComponent() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            error: "!bg-error !text-error-foreground",
            success: "!bg-success !text-success-foreground",
          },
        }}
      />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
