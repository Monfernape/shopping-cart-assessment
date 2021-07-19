import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import { AuthService } from "../services";
import { Alert } from "../shared/components";
import type { User, Error } from "../models";

type ISignUp = Omit<User, "spendingHistory"> & { confirmPassword: string };

export const SignUp = () => {
  const [user, setUser] = React.useState<ISignUp>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<Error>({ message: "" });
  const auth = new AuthService();
  const router = useRouter();

  const doesPasswordMatch =
    user.password && user.password === user.confirmPassword;

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError({ message: "" });
    if (!user.username || !user.password || !doesPasswordMatch) setError(true);
    else {
      const { confirmPassword, ...rest } = user;
      try {
        await auth.signup(rest);
        router.push("/login");
      } catch (err) {
        const {
          response: {
            data: { error },
          },
        } = err;
        setServerError(error);
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmission}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">First Name</label>
              <input
                type="text"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
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

            <div>
              <label className="sr-only">Confirm Password</label>
              <input
                type="password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {error && !doesPasswordMatch && (
                <p className="text-red-500 text-sm">Passwords Do Not Match</p>
              )}
            </div>
            <div className="flex justify-end p-1 w-full">
              <Link href="/login">
                <a className="text-indigo-500">Already Have An Account?</a>
              </Link>
            </div>

            <div className="flex p-1 w-full">
              {serverError.message && (
                <Alert
                  key={serverError.message}
                  type={"error"}
                  message={serverError.message}
                />
              )}
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
