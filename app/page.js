"use client";

import ModeToggle from "@/components/appLayouts/ModeToggle";
import { Button } from "@/components/ui/button";
import { seedEmMenu, seedUsers, seedXpsMenu } from "@/seed/seedData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const handleSeedXpsMenu = async () => {
    await seedXpsMenu();
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 flex flex-col items-center gap-8">
      {/* Top row: Get Started + ModeToggle (in a row) */}
      <div className="w-full max-w-4xl flex items-center justify-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/basics">
            <Button className="flex items-center gap-2">
              Get Started <ArrowRight />
            </Button>
          </Link>
        </div>

        <div>
          <Button asChild variant={"ghost"} size={"icon"}>
            <ModeToggle />
          </Button>
        </div>
      </div>

      {/* Seed buttons: responsive grid - 1 col on xs, 2 on sm, 4 on lg */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          className="w-full"
          type="button"
          onClick={() => seedPortalsData()}
        >
          Seed Portal Data
        </Button>

        <Button
          className="w-full"
          type="button"
          onClick={async () => await seedUsers()}
        >
          Seed Users
        </Button>

        <Button className="w-full" type="button" onClick={() => seedEmMenu()}>
          Seed EM Menu
        </Button>

        <Button className="w-full" type="button" onClick={handleSeedXpsMenu}>
          Seed XPS Menu
        </Button>
      </div>
    </div>
  );
}
