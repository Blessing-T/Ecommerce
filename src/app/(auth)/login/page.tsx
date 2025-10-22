"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import Button from "@/shared/components/UI/button";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    signIn("credentials", {
      ...loginData,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/admin");
        }

        if (callback?.error) {
          setError(callback.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen bg-gray-200">
      <div className="w-5/6 lg:w-[600px] p-6 rounded-lg drop-shadow-md flex flex-col gap-4 bg-white">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          className="border border-gray-200 rounded-md p-2"
          onChange={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          className="border border-gray-200 rounded-md p-2"
          onChange={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })}
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        {error && <span className="text-red-500 text-center">{error}</span>}
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
