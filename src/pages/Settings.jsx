"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  return (
    <div className=" p-4 md:p-6 mt-20 md:mt-5">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link
          to="/home"
          className="mr-4 p-[2px] rounded-full bg-gradient-to-t from-[#FFCFFA] via-[#CBF3FF] to-[#CBF3FF]"
        >
          <div className="bg-white rounded-full p-1">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </div>
        </Link>

        <h1 className="text-2xl font-semibold ">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-col flex-wrap sm:flex-row gap-2 mb-8">
        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center px-4 py-2 cursor-pointer ${
            activeTab === "account"
              ? "border-b-[1px] border-black"
              : "border-b-[1px] border-gray-200"
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          <span className="text-lg">Account information</span>
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={`flex items-center px-4 py-2 cursor-pointer ${
            activeTab === "email"
              ? "border-b-[1px] border-black"
              : "border-b-[1px] border-gray-200"
          }`}
        >
          <Mail className="h-4 w-4 mr-2" />
          <span className="text-lg">Change email</span>
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center px-4 py-2 cursor-pointer ${
            activeTab === "password"
              ? "border-b-[1px] border-black"
              : "border-b-[1px] border-gray-200"
          }`}
        >
          <Lock className="h-4 w-4 mr-2" />
          <span className="text-lg">Reset password</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        {/* Account Information Tab */}
        {activeTab === "account" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-gray-700" />
                <h2 className="text-xl font-semibold">Account information</h2>
              </div>
              <button
                onClick={() => setActiveTab("email")}
                className="bg-pink-200 border-[2px] border-pink-300 cursor-pointer text-black px-4 py-1 rounded-full text-lg font-medium"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className=" border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">e-mail</label>
                <input
                  type="email"
                  value="doeJohn@gmail.com"
                  disabled
                  className="w-full pb-2 border-transparent text-gray-500"
                />
              </div>
              <div className=" border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">
                  First name
                </label>
                <input
                  type="text"
                  value="Doe"
                  disabled
                  className="w-full pb-2 border-transparent text-gray-500"
                />
              </div>
            </div>

            <div className="mb-8 border-gray-300 border-[1px] rounded-md px-2">
              <label className="block text-lg text-gray-600">Last name</label>
              <input
                type="text"
                value="John"
                disabled
                className="w-full pb-2 border-transparent text-gray-500"
              />
            </div>

            <button className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full">
              Delete my account
            </button>
          </div>
        )}

        {/* Change Email Tab */}
        {activeTab === "email" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-700" />
                <h2 className="text-xl">Change email</h2>
              </div>
              <button className="bg-gray-100 text-black px-4 py-1 rounded-full text-sm">
                Edit
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex flex-row space-x-1 flex-wrap space-y-4">
                <input
                  type="email"
                  placeholder="New email"
                  className="w-full p-2 border-[1px] border-gray-300 rounded-md text-lg pl-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Retype the e-mail"
                  className="w-full p-2 border-[1px] border-gray-300 rounded-md text-lg pl-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full p-2 border-[1px] border-gray-300 rounded-md text-lg pl-3 focus:outline-none focus:border-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="w-full max-w-3xl bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full">
                Save
              </button>
            </div>
          </div>
        )}

        {/* Reset Password Tab */}
        {activeTab === "password" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-gray-700" />
                <h2 className="text-xl">Reset password</h2>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="w-full p-2 border-[1px] border-gray-300 focus:outline-none focus:border-blue-500 pl-3 text-lg rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  placeholder="Retype your password"
                  className="w-full p-2 border-[1px] border-gray-300 focus:outline-none focus:border-blue-500 pl-3 text-lg rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showRetypePassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full p-2 border-[1px] border-gray-300 focus:outline-none focus:border-blue-500 pl-3 text-lg rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-600 mb-6">
              <p>
                The password must be at least 8 characters long and contain:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>At least 1 uppercase letter (A-Z)</li>
                <li>
                  At least 1 lowercase letter (a-z), 1 number (0-9), 1 capital
                  letter (A-Z), and lowercase letter (a-z)
                </li>
                <li>Symbol (@ # $ %)</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button className="w-full max-w-3xl bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
