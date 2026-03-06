import Link from "next/link";

export const metadata = {
  title: "Build Submitted!",
};

export default function SubmitSuccessPage() {
  return (
    <div className="mx-auto max-w-md py-20 text-center space-y-6">
      <div className="text-6xl">🌸</div>
      <h1 className="text-3xl font-bold text-blossom-600">Build Submitted!</h1>
      <p className="text-rose-700/70">
        Thank you for sharing your build with the community. It will appear on the site once it has been reviewed.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/submit"
          className="rounded-lg bg-blossom-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blossom-500"
        >
          Submit Another Build
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-blossom-300 px-5 py-2.5 text-sm font-semibold text-rose-800 transition hover:border-blossom-500 hover:text-blossom-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
