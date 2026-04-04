import { useLocation, useNavigate } from "@tanstack/react-router";
import SignOutButton from "./sign-out.button";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { Suspense } from "react";
import { Link } from "./ui/link";
import { Skeleton } from "./ui/skeleton";

function HeaderSkeleton({ isPostCreatePath }: { isPostCreatePath?: boolean }) {
  return (
    <div className="flex items-center">
      {!isPostCreatePath && <Skeleton className="mr-2 w-24 h-10" />}
      <div className="flex gap-1 items-center mx-2">
        <Skeleton className="size-6 rounded-full shrink-0" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="mx-4 w-24 h-10" />
    </div>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostCreatePath = location.href === "/posts/create";
  return (
    <header className="flex items-center p-2 h-14">
      <nav className="mr-auto">
        <Link to="/">Home</Link>
      </nav>
      <Suspense
        fallback={<HeaderSkeleton isPostCreatePath={isPostCreatePath} />}
      >
        {!isPostCreatePath && (
          <Button
            className="mr-2"
            onClick={() => {
              navigate({ to: "/posts/create" });
            }}
          >
            New post
          </Button>
        )}
        <UserProfile className="text-sm" />
        <SignOutButton />
      </Suspense>
    </header>
  );
}
