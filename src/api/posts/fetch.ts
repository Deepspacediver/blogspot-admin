import axiosInstance from "@/lib/axios.config";
import { PostState, type Post, type User, type Comment } from "@/types";
import type { JSONContent } from "@tiptap/react";

export type PostsReturn = Pick<
  Post & User & { headerImageUrl?: string; },
  | "id"
  | "title"
  | "image"
  | "createdAt"
  | "state"
  | "email"
  | "username"
  | "pictureUrl"
  | "shortDescription"
  | "headerImageUrl"
>;

export const getPosts = async ({
  pageParam,
  state = PostState.all,
}: {
  pageParam?: number;
  state?: PostState;
}) => {
  const params = new URLSearchParams();
  if (pageParam) {
    params.append("cursor", String(pageParam));
  }
  if (state) {
    params.append("state", state);
  }
  return await axiosInstance.get<PostsReturn[]>(`/posts?${params.toString()}`);
};

type GetPostProps = {
  id: number;
  state?: PostState;
};

export type PostReturn = {
  post: Pick<
    Post & User & { headerImageUrl?: string; },
    | "id"
    | "title"
    | "image"
    | "createdAt"
    | "state"
    | "email"
    | "username"
    | "pictureUrl"
    | "shortDescription"
    | "headerImageUrl"
    | "content"
  >;
  comments: Pick<Comment & User, "id" | "content" | "createdAt" | "pictureUrl" | "username" | "email">[];
};



export const getPost = async ({ id, state }: GetPostProps) => {
  const stateParam = state ? `state=${state}` : "";
  const { data } = await axiosInstance.get<PostReturn>(`/posts/${id}?${stateParam}`);
  return data;
};

type CreatePostProps = {
  title: string;
  content: JSONContent;
  shortDescription: string;
  image?: File;
  state?: PostState;
  fileIds?: number[];
};

export const createPost = async (data: CreatePostProps) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const parsedValue = typeof value === "object" && !(value instanceof File) ? JSON.stringify(value) : value;
      formData.append(key, parsedValue);
    }
  });
  return await axiosInstance.postForm(`/posts`, formData);
};

type UpdatePostProps = Partial<CreatePostProps> & { id: number; };

export const updatePost = async ({ id, ...data }: UpdatePostProps) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const parsedValue = typeof value === "object" && !(value instanceof File) ? JSON.stringify(value) : value;
      formData.append(key, parsedValue);
    }
  });
  return await axiosInstance.patchForm(`/posts/${id}`, formData);
};

export const deleteComment = async ({ postId, id }: { postId: number, id: number; }) => {
  return await axiosInstance.delete(`/posts/${postId}/comments/${id}`);
};

export const deletePost = async ({ id }: { id: number; }) => {
  return await axiosInstance.delete(`/posts/${id}`);
};