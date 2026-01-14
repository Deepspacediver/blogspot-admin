import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useSignOut } from "@/api/auth/query";

export default function SignOutButton() {
  const { mutate: signOut } = useSignOut();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        signOut();
      }}
    >
      <LogOut />
    </Button>
  );
}
