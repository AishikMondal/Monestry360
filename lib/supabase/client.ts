import { createBrowserClient } from "@supabase/ssr"
export function createClient() {

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  console.log("[v0] Browser client - Supabase URL available:", !!supabaseUrl)
  console.log("[v0] Browser client - Supabase Anon Key available:", !!supabaseAnonKey)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables in browser client")
    console.error("[v0] NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "SET" : "MISSING")
    console.error("[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "SET" : "MISSING")
    throw new Error("Missing Supabase environment variables")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
