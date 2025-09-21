"use client";
import ModeToggle from "@/components/appLayout/ModeToggle";
import { Button } from "@/components/ui/button";
import { seedPortals } from "@/seed/seedData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const seedPortalsData = async () => {
    await seedPortals();
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"/basics"}>
        <Button>
          Get Started <ArrowRight />
        </Button>
      </Link>

      <Button type="button" onClick={() => seedPortalsData()}>
        Seed Data
      </Button>

      <Button asChild variant={"ghost"} size={"icon"}>
        <ModeToggle />
      </Button>
    </div>
  );
}
