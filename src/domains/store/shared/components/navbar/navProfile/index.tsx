"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRef } from "react";

import { ProfileIcon } from "@/shared/components/icons/svgIcons";
import Button from "@/shared/components/UI/button";
import { useToggleMenu } from "@/shared/hooks/useToggleMenu";
import { cn } from "@/shared/utils/styling";

const NavBarProfile = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, menuRef);

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };
  const { data: session } = useSession();

  return (
    <div className="relative">
      <Button
        onClick={toggleMenu}
        className={cn(
          "border-white h-9 hover:border-gray-300 transition-all text-gray-500 text-sm duration-300",
          isActive && "border-gray-300 bg-gray-50"
        )}
      >
        <ProfileIcon width={16} className="fill-white transition-all duration-300 stroke-gray-500 stroke-2" />
        <span className="select-none hidden lg:block">Account</span>
      </Button>
      
      <div
        ref={menuRef}
        className={cn(
          "w-[140px] absolute rounded-lg overflow-hidden flex flex-col items-center top-[42px] right-0 border border-gray-300 bg-white shadow-md scale-[0.97] invisible opacity-0 transition-all duration-300 p-1 z-10",
          isActive && "scale-100 visible opacity-100"
        )}
      >
        {/* show session-based menu */}
        {session?.user ? (
          <>
            <div className="w-full px-2 py-2 text-left text-sm text-gray-700">Signed in as</div>
            <div className="w-full px-2 pb-2 text-left font-medium">{session.user.name ?? session.user.email}</div>
            <Link href="/account" className="w-full">
              <Button className="border-white font-semibold text-sm hover:bg-gray-100 w-full">My Account</Button>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full"
            >
              <Button className="border-white font-semibold text-sm hover:bg-gray-100 w-full">Sign Out</Button>
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="w-full">
              <Button className="border-white font-semibold text-sm hover:bg-gray-100 w-full">Sign In</Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button className="border-white font-semibold text-sm hover:bg-gray-100 w-full">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBarProfile;
