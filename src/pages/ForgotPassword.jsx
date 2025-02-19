import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StateModal from "@/modals/StatusModal";
import logo from "@/assets/logo.png";
import emailjs from "emailjs-com"; 
import { useNavigate } from "react-router-dom";
import { setCookie } from "@/utils/cookies";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

//   const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const sendOTP = async (email, otp) => {
    try {
      const templateParams = {
        to_email: email,
        otp: otp,
      };

      await emailjs.send(
        "service_j0shqzg",
        "template_jwbc2y7", 
        templateParams,
        "5eR8XMsDN1mBxKRpk" 
      );

      console.log("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }

    const otp = generateOTP();
    setCookie("otp", otp, 5);
    await sendOTP(email, otp);

    navigate("/verification"); 
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
            Forgot Password
          </h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-4">
            <label className="text-lg font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">
          Forget Password
        </h1>
      </div>

      <StateModal isOpen={isOpen} close={close} type={"oops"} />
    </div>
  );
}