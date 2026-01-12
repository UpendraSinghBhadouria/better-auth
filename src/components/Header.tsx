export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { getCurrentUser } from "@/actions/user";
import HeaderClient from "./Header.client";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <HeaderClient user={user} />
        {user ? (
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
            <UserDropdown user={user} />
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
