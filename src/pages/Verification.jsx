import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { getCookie, setCookie } from "@/utils/cookies";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

export default function Verification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = getCookie("email");
    if (userEmail) {
      setEmail(userEmail);
    }

    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
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

  const handleResendOTP = async () => {
    const newOTP = generateOTP();
    setCookie("otp", newOTP, 5);
    await sendOTP(email, newOTP);
    setTimer(30);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOTP = otp.join("");
    const savedOTP = getCookie("otp");

    if (enteredOTP === savedOTP) {
      navigate("/reset-password");
    } else {
      setError("Invalid OTP. Please try again.");
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
          <h1 className="text-blue-500 font-medium text-4xl mb-10">
            Verification Code
          </h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-gray-600 text-lg">We have sent you an OTP code.</p>
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-center text-2xl bg-white border-none rounded-xl"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                required
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Wait For{" "}
            {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : "00:00"}
            {timer === 0 && (
              <button
                type="button"
                onClick={handleResendOTP}
                className="ml-2 text-blue-500 hover:underline"
              >
                Send Again
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-[rgba(137,221,247,1)] via-[rgba(137,221,247,1)] to-[rgba(255,255,255,1)] shadow-xl hover:shadow-lg duration-300 rounded-full py-7 font-bold text-2xl tracking-wider mt-4"
          >
            Next
          </Button>
          <div className="text-center text-sm">
            <span className="text-gray-600">
              Didn&apos;t you receive any code?{" "}
            </span>
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-blue-500 hover:underline"
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">
          Verification Code
        </h1>
      </div>
    </div>
  );
}
