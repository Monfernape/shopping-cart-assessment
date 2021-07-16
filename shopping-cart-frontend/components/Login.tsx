import React from "react";
import Link from "next/link";
import { AuthService } from "../services"
import type { User } from "../models";
import { LockClosedIcon } from "@heroicons/react/solid";

export const Login = () => {
  const [user, setUser] = React.useState<Pick<User, "username" | "password">>({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState<boolean>(false);

  const auth = new AuthService();

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    const { username, password } = user;
    console.log(user);
    if (!username || !password) setError(true);
    else {
      try {
        const response =  await auth.login(user)
        console.log({response})
      } catch(error) {
        console.log({error})
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmission}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Email address/Username</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {error && !user.username && (
                <p className="text-red-500 text-sm">Username is required</p>
              )}
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {error && !user.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>

            <div className="flex justify-end p-1 w-full">
              <Link href="/signup">
                <a className="text-indigo-500">New User? Sign Up Here</a>
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
