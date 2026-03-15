import { usePost } from "@/api/posts/query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const { data } = usePost({ id: +postId });

  return <div>{data?.data?.title}</div>;
}
