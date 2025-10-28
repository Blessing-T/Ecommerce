"use client";

import { LockIcon, CreditCard, Building2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatPrice } from "@/shared/utils/formatting";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, selectCartTotal, clearCart } from "@/store/slices/cartSlice";

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay securely with your card",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: CreditCard, // We'll use CreditCard icon as a temporary replacement
    description: "Fast and secure payment with PayPal",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => selectCartItems(state));
  const total = useAppSelector(selectCartTotal);
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push("/");
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Here you would integrate with your payment provider
      // For example, with Stripe:
      // const { sessionId } = await createPaymentSession(items, total);
      // await redirectToPayment(sessionId);
      
     
      await new Promise(resolve => setTimeout(resolve, 2000));
      
     
      dispatch(clearCart());
      router.push("/checkout/success");
    } catch (error) {
      console.error("Payment failed:", error);
    
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex space-x-4 py-4 border-b">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/images/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium mt-1">
                      {formatPrice(item.product.salePrice || item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center p-4 border rounded-lg transition-colors ${
                    selectedMethod === method.id
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-600"
                  }`}
                >
                  <method.icon className="w-6 h-6 text-gray-600" />
                  <div className="ml-4 text-left">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </button>
              ))}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-medium
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                         disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <LockIcon className="w-4 h-4" />
                  <span>
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
                  </span>
                </div>
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}