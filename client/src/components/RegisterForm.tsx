"use client";

import { API_URL } from "@/utils/const";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FormError {
  field: string | null;
  constraints: string[];
}

export default function RegisterForm() {
  // const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormError[] | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError(null)
    setFormErrors(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("API URL NODE_ENV:", process.env.NODE_ENV);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setFormErrors(data.errors);
        return;
      }

      toast.success("Registration successful");
      router.push("/auth/login");
    } catch (e) {
      toast.error("Registration failed, please try again");
    }
  };

  const getErrorMessage = (field: string) => {
    const error = formErrors?.find((error) => error.field === field);
    return error?.constraints?.[0];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-w-[50%] bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="w-full border-2"
        />
        {getErrorMessage("username") && (
          <p className="text-xs text-red-500">{getErrorMessage("username")}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border-2"
        />
        {getErrorMessage("email") && (
          <p className="text-xs text-red-500">{getErrorMessage("email")}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full border-2"
        />
        {getErrorMessage("password") && (
          <p className="text-xs text-red-500">{getErrorMessage("password")}</p>
        )}
      </div>
      <button type="submit">Register</button>
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {formErrors
        ?.find((error: any) => error.field === null)
        ?.constraints?.map((msg: string) => (
          <p key={msg} className="text-xs text-red-500">
            {msg}
          </p>
        ))}
    </form>
  );
}
