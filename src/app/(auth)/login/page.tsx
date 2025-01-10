"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://influencer-backend.vercel.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "An error occurred. Please try again.");
        return;
      }

      localStorage.setItem("name", data.username);
      setEmail("");
      setPassword("");

      router.push("/");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center overflow-hidden py-6">
      <div className="mx-auto grid h-full w-full max-w-6xl items-center gap-4 overflow-auto md:grid-cols-2">
        <div className="border-gray max-w-md rounded-lg border p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold">Login</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray w-full rounded-lg border px-4 py-3 text-sm outline-blue-600"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray w-full rounded-lg border px-4 py-3 text-sm outline-blue-600"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="mt-2 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="!mt-8">
              <button
                type="submit"
                className={`text-secondary w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold tracking-wide text-white focus:outline-none ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <p className="!mt-8 text-center text-sm">
              Don &apos;t have an account?
              <Link
                href="/register"
                className="ml-1 whitespace-nowrap font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
        <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
          <Image
            src="https://readymadeui.com/login-image.webp"
            className="mx-auto block h-full w-full object-cover max-md:w-4/5"
            alt="Dining Experience"
            width={2000}
            height={2000}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
