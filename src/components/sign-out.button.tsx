import { Button } from "./ui/button";
import { useSignOut } from "@/api/auth/query";

export default function SignOutButton() {
  const { mutate: signOut } = useSignOut();
  return (
    <Button
      variant={"default"}
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
}
