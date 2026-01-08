import axiosInstance from "@/lib/axios.config";

export type SignUpProps = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const signUp = async (payload: SignUpProps) => {
  const { data } = await axiosInstance.post("/auth/signup", { ...payload });
  return data;
};

export type SignInProps = {
  email: string;
  password: string;
};

export const signIn = async (payload: SignInProps) => {
  const { data } = await axiosInstance.post("/auth/signin", { ...payload });
  return data;
};

export const refreshToken = async () => {
  const { data } = await axiosInstance.post("/auth/refresh");
  return data;
};
