import { postsQueryOptions, usePosts } from "@/api/posts/query";
import PostPreview from "@/features/posts/post-preview";
import { createFileRoute } from "@tanstack/react-router";
import Loader from "@/components/loader";
import { userQueryOptions } from "@/api/users/query";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureInfiniteQueryData(postsQueryOptions());
    queryClient.ensureQueryData(userQueryOptions);
  },

  pendingComponent: Loader,
});

function Index() {
  const { data } = usePosts();
  const posts = data.pages.flatMap((page) => page.data);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(672px,1fr))] gap-8 justify-items-center items-center lg:max-w-[90%] mx-auto">
      {posts.map((post) => {
        return <PostPreview key={post.id} data={post} />;
      })}
    </div>
  );
}
