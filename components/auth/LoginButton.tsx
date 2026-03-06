"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-8 w-20 animate-pulse rounded-lg bg-cream-200" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/submit"
          className="rounded-lg bg-blossom-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blossom-500"
        >
          + Submit Build
        </Link>
        <div className="flex items-center gap-2 rounded-lg border border-blossom-200 bg-white px-3 py-1.5">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name ?? "User avatar"}
              width={22}
              height={22}
              className="rounded-full"
            />
          )}
          <span className="hidden text-sm font-medium text-rose-800 sm:block">
            {session.user.name}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-rose-400 transition hover:text-blossom-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-lg border border-blossom-300 bg-white px-3 py-1.5 text-sm font-semibold text-rose-800 transition hover:border-blossom-500 hover:text-blossom-600"
    >
      Log In
    </Link>
  );
}
