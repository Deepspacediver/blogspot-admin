import { useUser } from "@/api/users/query";
import { User as UserSVG } from "lucide-react";

export default function UserProfile() {
  const { data: user } = useUser();
  const { pictureUrl, username, email } = user;

  return (
    <div className="flex gap-1">
      {pictureUrl ? (
        <img src={pictureUrl} width={24} height={24} alt="user picture" />
      ) : (
        <UserSVG className="size-6" />
      )}
      <p>{username || email}</p>
    </div>
  );
}
