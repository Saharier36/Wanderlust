"use client";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email, // required
      password: user.password, // required
    });
    if (data) {
      redirect("/");
    } else if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="bg-[#F9FAFC]">
      <Form onSubmit={onSubmit} className="w-full max-w-md mx-auto my-10 px-6">
        <div className="text-center my-4">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 text-xs">
            Resume your adventure with Wanderlust
          </p>
        </div>
        <Fieldset className="bg-white p-6 shadow-md border border-gray-100">
          <FieldGroup>
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input
                  className="w-full"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </FieldGroup>

          <Button type="submit" fullWidth className="bg-[#15A1BF] rounded-none">
            Sign In
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-0 border-t border-gray-200" />
            <span className="text-xs text-gray-400">Or sign up with</span>
            <hr className="flex-1 border-0 border-t border-gray-200" />
          </div>

          {/* Google */}
          <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            fullWidth
            className="rounded-none border"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>{" "}
            Sign Up With Google
          </Button>
          <p className="text-center text-sm text-[#6b7280]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#15A1BF] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </Fieldset>
      </Form>
    </div>
  );
};

export default LoginPage;
