import { useLocation, useNavigate } from "@tanstack/react-router";
import SignOutButton from "./sign-out.button";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { Suspense } from "react";
import { Link } from "./ui/link";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPostCreatePath = location.href === "/posts/create";
  return (
    <header className="flex items-center p-2">
      <nav className="mr-auto">
        <Link to="/posts/create">Home</Link>
      </nav>
      <Suspense fallback={<div>Loading user...</div>}>
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
