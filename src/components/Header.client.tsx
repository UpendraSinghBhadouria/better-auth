"use client";

import { User } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderClientProps {
  user: User | undefined;
}
const HeaderClient = ({ user }: HeaderClientProps) => {
  const path = usePathname();

  if (path !== "/" || user) {
    return null;
  }

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link href="#features" className="text-gray-600 hover:text-blue-600">
        Features
      </Link>
      <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">
        Testimonials
      </Link>
    </div>
  );
};

export default HeaderClient;
