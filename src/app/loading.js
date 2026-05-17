import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <main className="min-h-screen flex grow flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3">
        <Spinner color="accent" />
        <h4 className="text-sm text-gray-800 italic tracking-wide">
          Mapping out your journey...
        </h4>
      </div>
    </main>
  );
}
