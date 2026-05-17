import { ArrowLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex grow flex-col items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Lost in Transit?
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-lg mx-auto">
          It seems the destination you&apos;re looking for isn&apos;t on our
          map. Even the most seasoned travelers take a wrong turn every now and
          then.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button size="lg" className="bg-cyan-600 rounded-none">
              <ArrowLeft />
              Back to Basecamp
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
