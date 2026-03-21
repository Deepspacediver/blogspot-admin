import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createPost, getPost, getPosts, updatePost } from "./fetch";

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
