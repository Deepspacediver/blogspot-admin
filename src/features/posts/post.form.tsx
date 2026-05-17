import z from "zod";
import { Controller, useForm } from "react-hook-form";
import * as postsAPI from "@/api/posts/query";
import { zodResolver } from "@hookform/resolvers/zod";
import TipTapEditor from "@/components/tiptap";
import { Button } from "@/components/ui/button";
import { FormMessage, Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save } from "lucide-react";
import { useNavigate, useCanGoBack, useRouter } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ui/link";
import { PostState } from "@/types";
import type { PostReturn } from "@/api/posts/fetch";
import { DeletePostDialog } from "./delete-post.dialog";
import { useEditor } from "@tiptap/react";
import { extensions } from "@/components/tiptap/extensions";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.looseObject({}),
  shortDescription: z.string().min(1),
  image: z.instanceof(FileList).refine((fileList) => fileList.length === 1, {
    message: "Image is required",
  }),
  isPublished: z.boolean().default(false),
});

const editFormSchema = z.object({
  ...formSchema.shape,
  image: z.union([z.undefined(), z.instanceof(FileList)]).refine(
    (fileList) => {
      if (!fileList) return true;
      return fileList.length <= 1;
    },
    {
      message: "Image is required",
    },
  ),
});

type FormSchema = z.infer<typeof editFormSchema | typeof formSchema>;

type PostFormProps = {
  data?: PostReturn["post"];
};
export default function PostForm({ data: postData }: PostFormProps) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  const isEdit = !!postData;
  const form = useForm({
    defaultValues: {
      title: postData?.title || "",
      shortDescription: postData?.shortDescription || "",
      isPublished: postData?.state === PostState.published || false,
      content: postData?.content || {},
      image: undefined,
    },
    resolver: zodResolver(isEdit ? editFormSchema : formSchema),
  });

  const { mutate: createPost, isPending } = postsAPI.useCreate();
  const { mutate: editPost, isPending: isEditPending } = postsAPI.useUpdate();
  const { mutate: deletePost, isPending: isDeletePending } =
    postsAPI.useDelete();
  const editor = useEditor({
    content: postData?.content,
    extensions,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      form.setValue("content", json);
    },
  });

  const getImagesInEditor = () => {
    const imageIds: number[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "image") {
        imageIds.push(node.attrs.fileId as number);
      }
    });

    return imageIds;
  };

  const handleSubmit = (data: FormSchema) => {
    const fileIds = getImagesInEditor();
    if (postData) {
      return editPost({
        ...data,
        id: postData.id,
        state: data.isPublished ? PostState.published : PostState.draft,
        image: data.image?.[0] || undefined,
        fileIds,
      });
    }
    createPost({
      ...data,
      state: data.isPublished ? PostState.published : PostState.draft,
      image: data?.image?.[0],
      fileIds,
    });
  };
  const formErrors = form?.formState?.errors;

  return (
    <>
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold tracking-tight gap-1.5 flex items-center">
          <h2 className="inline-block">
            {isEdit ? "Edit Post" : "Create New Post"}
          </h2>
          {postData?.id && (
            <DeletePostDialog
              onClick={() => {
                deletePost({
                  id: postData.id,
                });
              }}
            />
          )}
        </CardTitle>
        <p className="text-muted-foreground">
          Share your thoughts with the world. Fill in the details below.
        </p>
      </CardHeader>
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Post Title
                </Label>
                <Input
                  {...form.register("title")}
                  id="title"
                  placeholder="Enter a catchy title..."
                  className="h-11"
                />
                <FormMessage message={formErrors.title?.message} />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="shortDescription"
                  className="text-sm font-semibold"
                >
                  Short Description
                </Label>
                <Textarea
                  {...form.register("shortDescription")}
                  id="shortDescription"
                  placeholder="Briefly describe what this post is about..."
                />
                <FormMessage message={formErrors.shortDescription?.message} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-semibold gap-1">
                  Featured Image
                  {postData?.headerImageUrl && (
                    <ExternalLink
                      className="text-xs"
                      target="_blank"
                      href={postData.headerImageUrl}
                    >
                      (current photo)
                    </ExternalLink>
                  )}
                </Label>
                <div className="relative space-y-0.5">
                  <Input
                    {...form.register("image")}
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple={false}
                    id="image"
                  />

                  <p className="text-xs text-muted-foreground/60">
                    PNG, JPG or GIF (max. 5MB)
                  </p>
                </div>
                <FormMessage message={formErrors.image?.message} />
              </div>

              <Label
                htmlFor="isPublished"
                className="flex flex-col items-start w-full"
              >
                <p className="text-sm font-semibold">Publish Immediately</p>
                <div className="flex items-center w-full justify-between p-4 border rounded-lg bg-muted/20">
                  <p className="text-sm text-foreground font-normal">
                    Make this post visible to everyone.
                  </p>
                  <Controller
                    control={form.control}
                    name="isPublished"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Switch
                          checked={value}
                          onCheckedChange={onChange}
                          id="isPublished"
                        />
                      );
                    }}
                  />
                </div>
              </Label>
            </div>
          </div>

          <div className="space-y-4 ">
            <Label className="text-lg font-semibold">Post Content</Label>
            <div className="pb-2">
              <Controller
                control={form.control}
                name="content"
                render={() => <TipTapEditor editor={editor} />}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t pt-6">
          {canGoBack && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (canGoBack) {
                  return router.history.back();
                }
                navigate({ to: "/" });
              }}
              disabled={isPending || isEditPending}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            className="px-8 bg-primary hover:bg-primary/90 min-w-28"
            isLoading={isPending || isEditPending || isDeletePending}
          >
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? "Edit post" : "Create post"}
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
