import type { UserDetailsReturn } from "@/api/users/fetch";
import { useUser } from "@/api/users/query";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { User as UserSVG } from "lucide-react";

type UnLoggedUserProfileProps = {
  data: Omit<UserDetailsReturn, "role"> & { role?: User["role"] | null };
  children?: React.ReactNode;
  className?: string;
};
export function UserContent({
  data,
  children,
  className,
}: UnLoggedUserProfileProps) {
  const { pictureUrl, username, email } = data;
  return (
    <div className={cn("flex gap-1 items-center", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden ",
          !pictureUrl && "bg-secondary",
        )}
      >
        {pictureUrl ? (
          <img src={pictureUrl} width={24} height={24} alt="user picture" />
        ) : (
          <UserSVG className="size-10 p-1" />
        )}
      </div>
      <div className="flex flex-col">
        <p>{username || email}</p>
        {children}
      </div>
    </div>
  );
}

export function UnLoggedUserProfile({
  data,
  children,
  className,
}: UnLoggedUserProfileProps) {
  return (
    <UserContent className={className} data={data}>
      {children}
    </UserContent>
  );
}

export function LoggedUserProfile({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const {
    data: { pictureUrl, username, email },
  } = useUser();

  return (
    <UserContent className={className} data={{ pictureUrl, username, email }}>
      {children}
    </UserContent>
  );
}

export default function UserProfile({
  data,
  children,
  className,
}: Partial<UnLoggedUserProfileProps>) {
  if (data) {
    return (
      <UnLoggedUserProfile className={className} data={data}>
        {children}
      </UnLoggedUserProfile>
    );
  }
  return (
    <LoggedUserProfile className={className}>{children}</LoggedUserProfile>
  );
}
