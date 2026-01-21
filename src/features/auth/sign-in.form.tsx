import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/api/auth/query";
import { FormMessage, Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

// One capital letter, one special character, one number, 8 characters min
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const formSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().regex(PASSWORD_REGEX, {
    error:
      "Password must contain 1 special character, 1 capital letter & be 8 characters long",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const form = useForm({ resolver: zodResolver(formSchema) });
  const { mutate: signIn, isPending } = useSignIn();
  const onSubmit = (values: FormValues) => {
    signIn(values);
  };

  const formErrors = form?.formState?.errors;

  return (
    <div className="px-6 py-10 shadow-all-2xl rounded-2xl w-1/2 min-w-80 space-y-2 flex flex-col items-center max-w-xl">
      <h2 className="text-4xl">Sign in </h2>
      <form className="w-full space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          autoComplete="email"
          formNoValidate
          placeholder="Enter your email"
          id="email"
          {...form.register("email")}
        />
        <FormMessage message={formErrors.email?.message} />

        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="Enter your password"
          id="password"
          type="password"
          {...form.register("password")}
        />
        <FormMessage message={formErrors.password?.message} />
        <p>
          Don't have account? <Link to="/sign-up">Sign up</Link>
        </p>

        <Button isLoading={isPending} size={"lg"} className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
