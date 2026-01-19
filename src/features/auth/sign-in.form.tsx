import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/api/auth/query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// One capital letter, one special character, one number, 8 characters min
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const formSchema = z.object({
  email: z.email(),
  password: z.string().regex(PASSWORD_REGEX),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const form = useForm({ resolver: zodResolver(formSchema) });
  const { mutate: signIn } = useSignIn();
  const onSubmit = (values: FormValues) => {
    signIn(values);
  };

  return (
    <div>
      <h2 className="text-4xl">Sign in </h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          autoComplete="email"
          formNoValidate
          {...form.register("email")}
        />

        <Label htmlFor="password">Password</Label>
        <Input type="password" {...form.register("password")} />

        <Button>Submit</Button>
      </form>
    </div>
  );
}
