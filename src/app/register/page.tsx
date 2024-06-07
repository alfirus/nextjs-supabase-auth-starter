"use client";
import Spinner from "@/components/Spinner";
import supabaseBrowser from "@/utils/supabase/browser";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const showPassClick = () => setShowPass((u) => !u);

  const onClick = async () => {
    setLoading(true);

    if (!username || !email || !password) {
      setLoading(false);
      return toast.error("Please Input All Data");
    }

    const { data, error } = await supabaseBrowser.auth.signUp({
      email,
      password,
    });

    if (error || !data) {
      setLoading(false);
      console.log(error);
      return toast.error(error?.message);
    }

    const { error: dbError } = await supabaseBrowser.from("users").insert({
      id: data.user?.id,
      username,
      email,
    });

    if (dbError) {
      setLoading(false);
      return toast.error(dbError?.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center mx-auto h-screen">
      <div className="bg-white px-8 py-6 rounded-lg space-y-6 w-[85vw] md:w-[50vw] lg:w-[38vw]">
        <h1 className="text-2xl font-bold mb-5">Create a New Account</h1>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Zeyad Sallam"
            onChange={(e) => setUsername(e?.target.value)}
            className="focus:outline-none bg-gray-50 border border-black-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>

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
          <div className="relative flex items-center">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e?.target.value)}
              className="focus:outline-none bg-gray-50 border border-black-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />

            {showPass ? (
              <EyeNoneIcon
                className="absolute ml-[93%] hover:cursor-pointer"
                onClick={showPassClick}
              />
            ) : (
              <EyeOpenIcon
                className="absolute ml-[93%] hover:cursor-pointer"
                onClick={showPassClick}
              />
            )}
          </div>
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
              "Register"
            ) : (
              <div className="flex flex-col items-center">
                <Spinner />
              </div>
            )}
          </button>
          <p className="text-sm font-light text-gray-500 ">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
