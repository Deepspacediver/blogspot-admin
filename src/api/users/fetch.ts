import axiosInstance from "@/lib/axios.config";
import type { User } from "@/types";

export type UserDetailsReturn = Omit<
  User,
  "id" | "password" | "createdAt" | "updatedAt"
>;
export const getUserDetails = async () => {
  const { data } = await axiosInstance.get<UserDetailsReturn>("/users/me");
  return data;
};
