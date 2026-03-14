import type { JSONContent } from "@tiptap/react";

export type User = {
  id: number;
  email: string;
  username?: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  pictureUrl?: string;
  role: "SUPER_ADMIN";
};

export type Comment = {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt?: Date;
};

export const PostState = {
  published: "published",
  draft: "draft",
  all: "all",
} as const;
export type PostState = (typeof PostState)[keyof typeof PostState];

export type Post = {
  id: number;
  title: string;
  content: JSONContent;
  shortDescription: string;
  authorId: number;
  createdAt: Date;
  updatedAt?: Date;
  image?: string;
  state: PostState;
};

export type File = {
  id: number;
  name: string;
  postId: number;
  createdAt: Date;
  size: number;
};
