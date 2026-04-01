import type { PostReturn } from "@/api/posts/fetch";
import { useDeleteComment } from "@/api/posts/query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserProfile from "@/components/user-profile";
import { getFormattedDateWithAttribute } from "@/lib/utils";
import { Trash2 } from "lucide-react";

type CommentProps = {
  data: PostReturn["comments"][number];
  postId: number;
};

export default function Comment({ data, postId }: CommentProps) {
  const { attributeDate, distanceDate } = getFormattedDateWithAttribute(
    data.createdAt,
  );
  const { mutate: deleteComment, isPending } = useDeleteComment({ postId });
  return (
    <Card className="gap-2 p-2 shadow-none border-none ">
      <div className="flex items-center gap-2 flex-nowrap">
        <UserProfile className="md:gap-4 min-w-0" data={data} />
        <time
          className="text-xs text-zinc-400/85 inline-block whitespace-nowrap shrink-0"
          dateTime={attributeDate}
        >
          {distanceDate}
        </time>
        <Button
          onClick={() => {
            deleteComment({
              postId,
              id: data.id,
            });
          }}
          isLoading={isPending}
          className="ml-auto"
          size={"icon"}
          variant={"ghost"}
        >
          <Trash2 />
        </Button>
      </div>
      <p className="pl-11 md:pl-14">{data.content}</p>
    </Card>
  );
}
