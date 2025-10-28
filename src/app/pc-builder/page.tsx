"use client";

import Link from "next/link";

const PCBuilder = () => {
  // This is a placeholder for the PC Builder page
  return (
    <div className="mt-[180px] min-h-screen bg-white">
      <div className="storeContainer py-8">
        <h1 className="text-3xl font-light mb-6">PC Builder</h1>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl mb-4">Build Your Custom PC</h2>
          <p className="text-gray-600 mb-6">
            Choose components for your custom PC build. This feature is coming soon!
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              "Processor (CPU)",
              "Motherboard",
              "Memory (RAM)",
              "Storage",
              "Graphics Card (GPU)",
              "Power Supply (PSU)",
              "Case",
              "CPU Cooler",
              "Case Fans"
            ].map((component) => (
              <div
                key={component}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
              >
                <h3 className="font-medium">{component}</h3>
                <p className="text-sm text-gray-500 mt-2">Click to select</p>
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PCBuilder;