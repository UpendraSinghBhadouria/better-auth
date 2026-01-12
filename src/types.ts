import { auth } from "./lib/auth";

export type User = typeof auth.$Infer.Session.user | null;
