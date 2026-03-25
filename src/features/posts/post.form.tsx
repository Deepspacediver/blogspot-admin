import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostForm from "@/features/posts/create-post.form";
import CommentsTable from "./comments.table";
import * as postsAPI from "@/api/posts/query";
import { Card } from "@/components/ui/card";

type PostFormProps = {
  postId?: number;
};

export default function PostForm({ postId }: PostFormProps) {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <Card className="shadow-all-3xl border-none bg-background/50 backdrop-blur-sm pt-0">
        {postId ? <EditPostView postId={postId} /> : <CreatePostForm />}
      </Card>
    </div>
  );
}

function EditPostView({ postId }: PostFormProps) {
  const { data } = postsAPI.usePost({ id: postId });
  return (
    <Tabs defaultValue="post">
      <TabsList className="w-full" variant={"line"}>
        <TabsTrigger className="text-lg w-1/2" value="post">
          Post
        </TabsTrigger>
        <TabsTrigger className="text-lg w-1/2" value="comments">
          Comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <CreatePostForm data={data.post} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentsTable data={data.comments} />
      </TabsContent>
    </Tabs>
  );
}
