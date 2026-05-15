import ky from "ky"

export const http = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})
