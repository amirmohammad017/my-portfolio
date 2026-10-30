import NextAuth from "next-auth";
import { authOptions } from "@/modules/property-pulse/utils/authOptions";

const handler = NextAuth(authOptions);
export {handler as GET , handler as POST }