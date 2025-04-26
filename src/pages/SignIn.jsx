"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StateModal from "@/modals/StatusModal";
import logo from "@/assets/logo.png";
import Swal from "sweetalert2";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function close() {
    setIsOpen(false);
  }

  //to update status and time active
  const updateLastActive = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        lastActive: serverTimestamp(),
        status: "Active",
      });
      console.log(`User ${userId} lastActive updated`);
    } catch (error) {
      console.error("Error updating lastActive:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      console.log("Logged in user:", userCredential.user);

      await updateLastActive(userId);

      Swal.fire({
        icon: "success",
        title: "Logged In",
        text: "You have successfully logged in!",
        confirmButtonText: "Proceed to Home",
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
        confirmButtonText: "Try Again",
      });
    }
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
          <h1 className="text-blue-500 font-medium text-4xl mb-10">Sign in</h1>
          <div className="space-y-4">
            <label className="text-lg font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-none rounded-xl py-6 mt-2"
            />
            <label className="text-lg font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex justify-between text-sm px-4">
            <Link to="/signup" className="hover:underline">
              Sign up
            </Link>
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">Welcome Back</h1>
      </div>

      <StateModal isOpen={isOpen} close={close} type={"oops"} />
    </div>
  );
}
