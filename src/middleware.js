import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Cek apakah user punya token login
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Semua link yang berawalan /dashboard akan dilindungi
};