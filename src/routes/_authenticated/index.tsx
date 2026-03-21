import { usePosts } from "@/api/posts/query";
import PostPreview from "@/features/posts/post-preview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
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
