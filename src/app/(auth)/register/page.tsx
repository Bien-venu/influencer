"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://influencer-backend.vercel.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || "An unexpected error occurred.");
        return;
      }

      setUsername("");
      setEmail("");
      setPassword("");
      const data = await response.json();
      localStorage.setItem("name", data.username);
      router.push("/");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center overflow-hidden py-6">
      <div className="mx-auto grid h-full w-full max-w-6xl items-center gap-4 overflow-auto md:grid-cols-2">
        <div className="max-md:mt-8 md:h-[300px] lg:h-[400px]">
          <Image
            src="https://readymadeui.com/login-image.webp"
            className="mx-auto block h-full w-full object-cover max-md:w-4/5"
            alt="Dining Experience"
            width={2000}
            height={2000}
          />
        </div>
        <div className="border-gray max-w-md rounded-lg border p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form
            onSubmit={handleRegister}
            className="space-y-4"
            autoComplete="off"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold">Register</h3>
            </div>

            <div>
              <label className="mb-2 block text-sm">Username</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-gray w-full rounded-lg border px-4 py-3 text-sm outline-blue-600"
                  placeholder="Enter your username"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray w-full rounded-lg border px-4 py-3 text-sm outline-blue-600"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray w-full rounded-lg border px-4 py-3 text-sm outline-blue-600"
                  placeholder="Enter your password"
                  autoComplete="off"
                />
              </div>
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
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <p className="!mt-8 text-center text-sm">
              Have an account?
              <Link
                href="/login"
                className="ml-1 whitespace-nowrap font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
