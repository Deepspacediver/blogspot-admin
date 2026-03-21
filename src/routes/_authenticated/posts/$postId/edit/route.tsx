import CreatePostForm from "@/features/posts/create-post.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/$postId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <CreatePostForm postId={+postId} />;
}
