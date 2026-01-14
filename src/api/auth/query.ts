import { useMutation } from "@tanstack/react-query";
import { signIn, signOut, signUp } from "@/api/auth/fetch";
import { useNavigate } from "@tanstack/react-router";
import { setIsLoggedIn } from "@/lib/local-storage-helpers";

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate({ to: "/" });
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
  });
};
