import React from 'react';
import Link from 'next/link'

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden px-8 py-12 transform transition-all duration-500 hover:scale-105">
          <div className="flex items-center mb-8">
            <img
              className="h-10 mr-4"
              src="google-logo.png"
              alt="Google Logo"
            />
            <h2 className="text-3xl font-bold">Sign In</h2>
          </div>
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email address"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
        <p className="mt-4 text-center text-gray-500 text-xs">
          &copy; 2023 My Website. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
