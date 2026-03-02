import Link from "next/link";

/**
 * Site-wide footer — server component.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-blossom-200 bg-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold text-rose-950"
            >
              <span aria-hidden="true">🌸</span>
              <span>
                Block<span className="text-blossom-400">Blueprints</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-rose-700/70">
              The ultimate Minecraft build tutorial library. From cozy cottages
              to epic sky islands.
            </p>
          </div>

          {/* Structures */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-rose-400">
              Structures
            </h3>
            <ul className="space-y-2 text-sm">
              {["castles", "houses", "villages", "mega-builds", "farms"].map(
                (s) => (
                  <li key={s}>
                    <Link
                      href={`/builds/${s}`}
                      className="capitalize text-rose-700 transition hover:text-blossom-600"
                    >
                      {s.replace("-", " ")}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Styles */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-rose-400">
              Styles
            </h3>
            <ul className="space-y-2 text-sm">
              {["gothic", "medieval", "modern", "cottagecore", "fantasy", "desert", "snow"].map(
                (s) => (
                  <li key={s}>
                    <Link
                      href={`/styles/${s}`}
                      className="capitalize text-rose-700 transition hover:text-blossom-600"
                    >
                      {s}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Site */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-rose-400">
              Site
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/search"
                  className="text-rose-700 transition hover:text-blossom-600"
                >
                  Browse All
                </Link>
              </li>
              <li>
                <Link
                  href="/search?difficulty=Beginner"
                  className="text-rose-700 transition hover:text-blossom-600"
                >
                  Beginner Builds
                </Link>
              </li>
              <li>
                <Link
                  href="/search?survivalFriendly=true"
                  className="text-rose-700 transition hover:text-blossom-600"
                >
                  Survival Friendly
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-blossom-200 pt-6 text-center text-xs text-rose-400">
          © {year} BlockBlueprints. Built with ❤️ for Minecraft builders.
        </div>
      </div>
    </footer>
  );
}
