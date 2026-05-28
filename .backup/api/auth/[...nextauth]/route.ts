import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// For static export, this doesn't work but prevents build errors
export const dynamic = 'force-static';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };