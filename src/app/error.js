"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ArrowLeft, ArrowRotateLeft } from "@gravity-ui/icons";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex grow flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">
          System Alert
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          Unexpected Turbulence
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-lg mx-auto">
          We&apos;ve hit a small roadblock on our journey. Even the best
          travelers face a detour now and then. We are working to clear the
          path.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="button"
            onClick={() => window.location.reload()}
            size="lg"
            className="bg-cyan-600 text-white rounded-none px-8 font-semibold"
          >
            <ArrowRotateLeft />
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="bordered"
              size="lg"
              className="border border-cyan-600 text-cyan-600 rounded-none px-8 font-semibold"
            >
              <ArrowLeft />
              Back to Basecamp
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
