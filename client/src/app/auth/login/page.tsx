"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.statusText}`);
      }

      const data = await response.json();

      alert(JSON.stringify(data));

      router.push("/songs");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <main>
      <h1 className="mb-20 text-center">Login Form</h1>

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
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
