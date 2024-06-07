"use client";
import Spinner from "@/components/Spinner";
import supabaseBrowser from "@/utils/supabase/browser";
import { useAuthStore } from "@/utils/zustand";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuthStore();

  const onClick = async () => {
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return toast.error("Please Input All Data");
    }

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return toast.error(error?.message);
    }

    setLoading(false);
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center mx-auto h-screen">
      <div className="bg-white px-8 py-8 rounded-lg space-y-6 w-[38vw]">
        <h1 className="text-2xl font-bold mb-5">Login To Your Account</h1>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e?.target.value)}
            className="focus:outline-none bg-gray-50 border border-black-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e?.target.value)}
            className="focus:outline-none bg-gray-50 border border-black-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>

        <div>
          <button
            onClick={onClick}
            disabled={loading}
            className={`mb-3 w-full text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600"
            } ${
              !loading && "hover:bg-indigo-700"
            } focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            {!loading ? (
              "Login"
            ) : (
              <div className="flex flex-col items-center">
                <Spinner />
              </div>
            )}
          </button>
          <p className="text-sm font-light text-gray-500 ">
            Don’t have an account yet?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
