"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/shared/components/UI/button";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen bg-gray-200">
      <div className="w-5/6 lg:w-[600px] p-6 rounded-lg drop-shadow-md flex flex-col gap-4 bg-white">
        <input
          type="text"
          placeholder="Name"
          value={signupData.name}
          className="border border-gray-200 rounded-md p-2"
          onChange={(e) => setSignupData({ ...signupData, name: e.currentTarget.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          className="border border-gray-200 rounded-md p-2"
          onChange={(e) => setSignupData({ ...signupData, email: e.currentTarget.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          className="border border-gray-200 rounded-md p-2"
          onChange={(e) => setSignupData({ ...signupData, password: e.currentTarget.value })}
        />
        <Button onClick={handleSignup} disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <span style={{ color: "red" }}>{error}</span>
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;