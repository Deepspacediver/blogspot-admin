import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { Suspense } from "react";

export default function Header() {
  return (
    <header>
      <nav>
        <Button variant={"link"}>d</Button>
      </nav>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile />
      </Suspense>
    </header>
  );
}
