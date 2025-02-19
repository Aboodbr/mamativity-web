import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex justify-between BG">
      <div className="space-y-8 bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] rounded-tr-[70px] w-full md:w-[50%] pt-10">
        <div className="w-32 mx-auto">
          <img
            src={logo}
            alt="Mamativity Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col justify-center px-8 lg:px-20 pt-20"
        >
          <h1 className="text-blue-500 font-medium text-4xl mb-10">
            Reset Password
          </h1>
          <p className="text-sm text-red-500 mt-2">
            The password must be different from the previous one.
          </p>
          <div className="space-y-4">
            <label className="text-lg font-medium">New Password</label>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="bg-white border-none rounded-xl py-6 mt-2"
            />
            <label className="text-lg font-medium">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-white border-none rounded-xl py-6 mt-2"
            />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-[rgba(137,221,247,1)] via-[rgba(137,221,247,1)] to-[rgba(255,255,255,1)] shadow-xl hover:shadow-lg duration-300 rounded-full py-7 font-bold text-2xl tracking-wider mt-4"
          >
            Next
          </Button>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">Reset your password</h1>
      </div>
    </div>
  );
}