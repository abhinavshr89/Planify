import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import UserLoading from "./user-loading";

const Header = async () => {
  // we are using the check user here 
  
  await checkUser();

  return (
    <header className="">
      <nav className="py-6 px-4 flex justify-between items-center bg-transparent">
        <Link href="/">
          <span className="text-3xl">Planify</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button variant="destructive" className="items-center gap-2 flex max-sm:hidden">
              <PenBox size={16} />
              <span>Create Project</span>
            </Button>
          </Link>
          <SignedOut>
            {/* this means the moment someone signs in he will be redirected to the `/onboarding` page  */}
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
      <UserLoading />
    </header>
  );
};

export default Header;
