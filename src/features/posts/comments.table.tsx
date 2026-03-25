import type { PostReturn } from "@/api/posts/fetch";

type CommentsTableProps = {
  data: PostReturn["comments"];
};

export default function CommentsTable({ data }: CommentsTableProps) {
  return (
    <div>
      {data.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
}
