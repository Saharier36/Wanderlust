import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/destinations"}>Destinations</Link>
          </li>
          <li>
            <Link href={"/my-bookings"}>My Bookings</Link>
          </li>

          <li>
            <Link href={"/add-destination"}>Add Destination</Link>
          </li>
        </ul>
        <Link href="/">
          <Image
            src={"/assets/Wanderlast.png"}
            height={150}
            width={150}
            alt="logo"
          />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/signup"}>Sign Up</Link>
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;
