"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 py-12">
      <div className="text-center">
        <span className="text-4xl">🌸</span>
        <h1 className="mt-3 text-2xl font-bold text-rose-950">Welcome back</h1>
        <p className="mt-1 text-sm text-rose-700/70">Sign in to submit your builds</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-blossom-200 bg-white p-6"
      >
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
            {error}
          </p>
        )}

        <div className="space-y-1.5">
          <label htmlFor="username" className="block text-sm font-medium text-rose-800">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-rose-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blossom-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blossom-500 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-rose-700/70">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blossom-600 hover:text-blossom-500">
          Register here
        </Link>
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-blossom-200 bg-cream-50 px-3 py-2 text-sm text-rose-950 placeholder-rose-300 focus:border-blossom-400 focus:outline-none focus:ring-2 focus:ring-blossom-400/30";
