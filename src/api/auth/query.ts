import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/api/auth/fetch";
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
