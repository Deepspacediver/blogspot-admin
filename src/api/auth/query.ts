import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/api/auth/fetch";
import { redirect } from "@tanstack/react-router";
import { setIsLoggedIn } from "@/lib/local-storage-helpers";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setIsLoggedIn(true);
      throw redirect({
        to: "/",
      });
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setIsLoggedIn(true);
      throw redirect({
        to: "/",
      });
    },
  });
};
