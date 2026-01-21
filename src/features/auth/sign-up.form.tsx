import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/api/auth/query";
import { FormMessage, Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { PASSWORD_REGEX } from "@/features/auth/sign-in.form";

const formSchema = z
  .object({
    email: z.email().toLowerCase(),
    password: z.string().regex(PASSWORD_REGEX, {
      error:
        "Password must contain 1 special character, 1 capital letter & be 8 characters long",
    }),
    confirmPassword: z.string().regex(PASSWORD_REGEX, {
      error: "Passwords must match",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["password"],
        code: "custom",
        message: "Passwords do not match",
      });
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const form = useForm({ resolver: zodResolver(formSchema) });
  const { mutate: signUp, isPending } = useSignUp();
  const onSubmit = (values: FormValues) => {
    signUp(values);
  };

  const formErrors = form?.formState?.errors;

  const { onChange: passwordOnChange, ...passwordRegister } =
    form.register("password");
  const { onChange: confirmPasswordOnChange, ...confirmPasswordRegister } =
    form.register("confirmPassword");

  return (
    <div className="px-6 py-10 shadow-all-2xl rounded-2xl w-1/2 min-w-80 space-y-2 flex flex-col items-center max-w-xl">
      <h2 className="text-4xl">Sign up </h2>
      <form
        noValidate
        className="w-full space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          autoComplete="email"
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
          {...passwordRegister}
          onChange={(e) => {
            passwordOnChange(e);
            form.clearErrors("confirmPassword");
          }}
        />
        <FormMessage message={formErrors.password?.message} />

        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          placeholder="Enter your password"
          id="confirmPassword"
          type="password"
          {...confirmPasswordRegister}
          onChange={(e) => {
            confirmPasswordOnChange(e);
            form.clearErrors("password");
          }}
        />
        <FormMessage message={formErrors.confirmPassword?.message} />

        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>

        <Button isLoading={isPending} size={"lg"} className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
