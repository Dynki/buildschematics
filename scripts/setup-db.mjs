/**
 * One-time Atlas database setup script.
 * Creates collections and indexes for the buildschematics app.
 *
 * Usage:
 *   node scripts/setup-db.mjs
 */

import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Load .env.local manually (no dotenv dependency needed) ───
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envLines = readFileSync(envPath, "utf-8").split("\n");
for (const line of envLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
  process.env[key] = val;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌  MONGODB_URI not found in .env.local");
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  console.log("✅  Connected to MongoDB Atlas");

  const db = client.db("buildschematics");

  // ─── users collection ──────────────────────────────────────
  const users = db.collection("users");

  // Unique index on username — used by auth + register
  await users.createIndex({ username: 1 }, { unique: true, name: "username_unique" });
  // Optional: index on email if you add it later
  await users.createIndex({ email: 1 }, { sparse: true, name: "email_sparse" });

  console.log("✅  users indexes created");

  // ─── builds collection ────────────────────────────────────
  const builds = db.collection("builds");

  // Unique index on slug — used for detail page lookups
  await builds.createIndex({ slug: 1 }, { unique: true, name: "slug_unique" });
  // Index for fetching a user's own builds (my-builds page)
  await builds.createIndex({ submittedBy: 1 }, { name: "submittedBy" });
  // Index for filtering approved builds
  await builds.createIndex({ approved: 1 }, { name: "approved" });
  // Compound index for common query: approved + sorted by date
  await builds.createIndex({ approved: 1, submittedAt: -1 }, { name: "approved_date" });
  // Text index for search across title, description, structure
  await builds.createIndex(
    { title: "text", description: "text", structure: "text" },
    { name: "text_search" }
  );

  console.log("✅  builds indexes created");

  console.log("\n🎉  Database setup complete. Collections and indexes are ready.");
}

main()
  .catch((err) => {
    console.error("❌  Setup failed:", err);
    process.exit(1);
  })
  .finally(() => client.close());
