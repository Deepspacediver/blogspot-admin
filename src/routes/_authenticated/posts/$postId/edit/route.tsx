import { postQueryOptions } from "@/api/posts/query";
import Loader from "@/components/loader";
import PostCard from "@/features/posts/post.card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/$postId/edit")({
  component: RouteComponent,
  pendingComponent: Loader,
  loader: ({ context: { queryClient }, params: { postId } }) => {
    queryClient.ensureQueryData(postQueryOptions({ id: +postId }));
  },
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return <PostCard postId={+postId} />;
}
