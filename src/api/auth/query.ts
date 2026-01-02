import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/api/auth/fetch";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
