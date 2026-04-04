import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createPost, deleteComment, deletePost, getPost, getPosts, updatePost } from "./fetch";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    },
  });
};

export const postsQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastCursor) => {
      if (lastPage.data?.length === 0) {
        return undefined;
      }
      return lastCursor + 1;
    },
  });

export const usePosts = () => useSuspenseInfiniteQuery(postsQueryOptions());

export const postQueryOptions = ({ id }: { id?: number; }) => {
  return queryOptions({
    queryKey: ["posts", id],
    queryFn: id ? () => getPost({ id }) : undefined,
  });
};


export const usePost = ({ id }: { id?: number; }) => useSuspenseQuery(postQueryOptions({ id }));

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post updated successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });
};


export const useDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });
};

export const useDeleteComment = ({ postId }: { postId: number; }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
    onError: () => {
      toast.error("Failed to delete comment");
    },
  });
};
