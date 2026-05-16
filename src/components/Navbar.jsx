"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { Bars, House, Person, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-separator backdrop-blur-xl">
      <header className="flex h-16 items-center justify-between px-6">
        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-4">
          <li>
            <Link href={"/"} className="hover:text-cyan-600">
              <House width={20} height={20} />{" "}
            </Link>
          </li>
          <li>
            <Link
              href={"/destinations"}
              className="hover:underline hover:text-cyan-600"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              href={"/my-bookings"}
              className="hover:underline hover:text-cyan-600"
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              href={"/add-destination"}
              className="hover:underline hover:text-cyan-600"
            >
              Add Destination
            </Link>
          </li>
        </ul>

        {/* Mobile Dropdown */}
        <div className="md:hidden flex items-center justify-center">
          <Dropdown onOpenChange={(open) => setMenuOpen(open)}>
            <Dropdown.Trigger>
              <a aria-label="Menu" className="flex items-center justify-center">
                {menuOpen ? (
                  <Xmark width={24} height={24} />
                ) : (
                  <Bars width={24} height={24} />
                )}
              </a>
            </Dropdown.Trigger>
            <Dropdown.Popover className="rounded-none">
              <Dropdown.Menu>
                <Dropdown.Item
                  id="home"
                  textValue="Home"
                  className="rounded-none"
                >
                  <Link href={"/"}>
                    <Label>Home</Label>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  id="destinations"
                  textValue="Destinations"
                  className="rounded-none"
                >
                  <Link href={"/destinations"}>
                    <Label>Destinations</Label>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  id="my-bookings"
                  textValue="My Bookings"
                  className="rounded-none"
                >
                  <Link href={"/my-bookings"}>
                    <Label>My Bookings</Label>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  id="add-destination"
                  textValue="Add Destination"
                  className="rounded-none"
                >
                  <Link href={"/add-destination"}>
                    <Label>Add Destination</Label>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

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
            <Link
              href={"/profile"}
              className="flex items-center gap-1 hover:hover:text-cyan-600"
            >
              <Person width={15} height={15} />
              <span className="hidden md:inline hover:underline">Profile</span>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt="John Doe"
                    src={user?.image}
                  />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </li>
              <li>
                <Button
                  onClick={handleSignout}
                  size="sm"
                  className="rounded-none bg-[#15A1BF]"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href={"/login"}
                  className="hover:underline hover:text-cyan-600"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={"/signup"}
                  className="hover:underline hover:text-cyan-600"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;
