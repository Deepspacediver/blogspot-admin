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

export type Post = {
  id: number;
  title: string;
  content: string;
  shortDescription: string;
  authorId: number;
  createdAt: Date;
  updatedAt?: Date;
  image?: string;
  isPublished: boolean;
};

export type File = {
  id: number;
  name: string;
  postId: number;
  createdAt: Date;
  size: number;
};
