import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
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

  // Niezalogowany → przekieruj na /logowanie
  if (!user && pathname.startsWith("/panel")) {
    return NextResponse.redirect(new URL("/logowanie", request.url))
  }

  // Zalogowany na /logowanie → przekieruj do właściwego panelu
  if (user && pathname === "/logowanie") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const target = profile?.role === "admin" ? "/panel/admin" : "/panel/klient"
    return NextResponse.redirect(new URL(target, request.url))
  }

  // Admin próbuje wejść w panel klienta (i odwrotnie)
  if (user && pathname.startsWith("/panel")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role === "admin" && pathname.startsWith("/panel/klient")) {
      return NextResponse.redirect(new URL("/panel/admin", request.url))
    }
    if (profile?.role === "client" && pathname.startsWith("/panel/admin")) {
      return NextResponse.redirect(new URL("/panel/klient", request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/panel/:path*", "/logowanie"],
}
