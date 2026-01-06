import { type FC, type FormEvent, type ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { FormLabel } from "@/shared/ui/FormLabel";
import { type SignUpDto } from "@/entities/url/model";
import { signUp } from "@/entities/url/api/auth-api.ts";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const SignUpForm: FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<SignUpDto>({
    email: "",
    password: "",
  });

  const registerMutation = useMutation({
    mutationFn: (data: SignUpDto) => signUp(data),
    onSuccess: () => {
      alert("Registration successful!");
      setFormData({ email: "", password: "" });
      onSuccess?.();
    },
    onError: (error: Error) => {
      alert(`Registration failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};
