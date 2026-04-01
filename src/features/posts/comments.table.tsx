import type { PostReturn } from "@/api/posts/fetch";
import Comment from "./comment";

type CommentsTableProps = {
  data: PostReturn;
};

export default function CommentsTable({ data }: CommentsTableProps) {
  return (
    <div>
      {data.comments.map((comment) => (
        <Comment key={comment.id} data={comment} postId={data.post.id} />
      ))}
    </div>
  );
}
