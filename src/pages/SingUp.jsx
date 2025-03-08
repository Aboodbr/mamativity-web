"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import StateModal from "@/modals/StatusModal";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // إنشاء الحساب في Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User Created:", user);

      // تخزين البيانات في Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        phone: formData.phone,
        email: formData.email,
        createdAt: new Date(),
        role: "user",
      });

      // عرض رسالة النجاح
      setModalType("success");
      setModalMessage("Your account has been created successfully.");
      open();

      // الانتقال إلى الصفحة الرئيسية بعد ثانيتين
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setModalType("error");
      setModalMessage(error.message);
      open();
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
          <h1 className="text-blue-500 font-medium text-4xl mb-10">Sign up</h1>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-white border-none rounded-xl py-6 mt-2"
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-white border-none rounded-xl py-6 mt-2"
              />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border-none rounded-xl py-6 mt-2"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-white border-none rounded-xl py-6 mt-2"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
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
            <Link to="/signin" className="hover:underline">
              Sign In
            </Link>
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">Create Account</h1>
      </div>

      <StateModal
        isOpen={isOpen}
        close={close}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
