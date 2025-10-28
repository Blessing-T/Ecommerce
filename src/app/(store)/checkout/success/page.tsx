"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Order Complete!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Thank you for your purchase. Your order has been received and will be processed shortly.
            </p>
            
            <div className="mt-8">
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-800"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}