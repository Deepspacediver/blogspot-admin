import { useMutation } from "@tanstack/react-query";
import { signIn, signOut, signUp } from "@/api/auth/fetch";
import { useNavigate } from "@tanstack/react-router";
import { setIsLoggedIn } from "@/lib/local-storage-helpers";

import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Sign up failed. Please try again.");
    },
  });
};

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate({ to: "/" });
    },
    onError: () => {
      toast.error("Sign in failed. Check your credentials.");
    },
  });
};

export const useSignOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      setIsLoggedIn(false);
      navigate({ to: "/sign-in", reloadDocument: true });
    },
    onError: () => {
      toast.error("Sign out failed");
    },
  });
};
