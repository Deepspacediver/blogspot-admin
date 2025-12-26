import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "./fetch";

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
