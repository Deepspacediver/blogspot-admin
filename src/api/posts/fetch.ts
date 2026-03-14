import axiosInstance from "@/lib/axios.config";
import { PostState, type Post, type User } from "@/types";
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

export type PostReturn = Pick<User, "username" | "email"> &
  Pick<Post, "authorId" | "title" | "createdAt" | "shortDescription"> & {
    headerImageUrl: string | null;
    pictureUrl: string | null;
  };


export const getPost = async ({ id, state }: GetPostProps) => {
  const stateParam = state ? `state=${state}` : "";
  return await axiosInstance.get<PostReturn>(`/posts/${id}?${stateParam}`);
};

type CreatePostProps = {
  title: string;
  content: JSONContent;
  shortDescription: string;
  image?: File;
  state?: PostState;
};

export const createPost = async (data: CreatePostProps) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    const parsedValue = typeof value === "object" && !(value instanceof File) ? JSON.stringify(value) : value;
    formData.append(key, parsedValue);
  });
  return await axiosInstance.postForm(`/posts`, formData);
};


