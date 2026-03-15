import CreatePostForm from "@/features/posts/create-post.form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4">
      <CreatePostForm />
    </div>
  );
}
