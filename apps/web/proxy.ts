import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  if (request.method !== "GET") return NextResponse.next()

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/reservation", request.url))
  }

  if (
    user &&
    (pathname === "/reservation" || pathname.startsWith("/dashboard"))
  ) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()

    if (!profile) {
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/reservation", request.url))
      }
      return supabaseResponse
    }

    if (pathname === "/reservation") {
      const target =
        profile.role === "admin" ? "/dashboard/admin" : "/dashboard/client"
      return NextResponse.redirect(new URL(target, request.url))
    }

    if (profile.role === "admin" && pathname.startsWith("/dashboard/client")) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    }
    if (profile.role === "client" && pathname.startsWith("/dashboard/admin")) {
      return NextResponse.redirect(new URL("/dashboard/client", request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/dashboard/:path*", "/reservation"],
}
