import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostForm from "@/features/posts/post.form";
import CommentsTable from "./comments.table";
import * as postsAPI from "@/api/posts/query";
import { Card } from "@/components/ui/card";

type PostCardProps = {
  postId?: number;
};

export default function PostCard({ postId }: PostCardProps) {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <Card className="shadow-all-3xl border-none bg-background/50 backdrop-blur-sm pt-0">
        {postId ? <EditPostView postId={postId} /> : <PostForm />}
      </Card>
    </div>
  );
}

function EditPostView({ postId }: PostCardProps) {
  const { data } = postsAPI.usePost({ id: postId });
  return (
    <Tabs defaultValue="post">
      <TabsList className="w-full" variant={"line"}>
        <TabsTrigger className="text-lg w-1/2" value="post">
          Post
        </TabsTrigger>
        <TabsTrigger
          disabled={data.comments.length === 0}
          className="text-lg w-1/2"
          value="comments"
        >
          Comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <PostForm data={data.post} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentsTable data={data} />
      </TabsContent>
    </Tabs>
  );
}
