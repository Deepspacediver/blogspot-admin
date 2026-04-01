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

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};


export const useDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/" });
    }
  });
};

export const useDeleteComment = ({ postId }: { postId: number; }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    }
  });
};
