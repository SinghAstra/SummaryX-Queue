import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Top Section with Large Number */}
        <div className="relative">
          <h1 className="text-5xl font-bold select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-gray-900">
                This is not the web page you are looking for.
              </p>
              <p className="text-gray-600">
                Looks like this page went on a space mission 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="pt-8 space-y-2">
          <p className="text-gray-600">Or you can navigate to:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
