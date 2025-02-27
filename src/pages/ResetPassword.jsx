import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, updatePassword } from "firebase/auth";

export default function ResetPassword() {
  const auth = getAuth();
  const user = auth.currentUser; // ✅ الحصول على المستخدم الحالي
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // ✅ تبديل رؤية كلمة المرور
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!user) {
      setError("User session has expired. Please sign in again.");
      navigate("/signin"); // ✅ إعادة توجيه المستخدم لتسجيل الدخول
      return;
    }

    try {
      await updatePassword(user, newPassword);
      alert("Password has been updated successfully.");
      navigate("/dashboard"); // ✅ توجيه المستخدم للصفحة الرئيسية بعد التحديث
    } catch (error) {
      console.error("Error updating password:", error.message);
      setError(error.message); // ✅ عرض رسالة الخطأ الفعلية من Firebase
    }
  };

  return (
    <div className="min-h-screen flex justify-between BG">
      <div className="space-y-8 bg-gradient-to-b from-[#FFCFFA] to-[#CBF3FF] rounded-tr-[70px] w-full md:w-[50%] pt-10">
        <div className="w-32 mx-auto">
          <img
            src={logo}
            alt="Logo"
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
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* ✅ إدخال كلمة المرور الجديدة */}
          <div className="space-y-4">
            <label className="text-lg font-medium">New Password</label>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="bg-white border-none rounded-xl py-6 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* ✅ تأكيد كلمة المرور */}
            <label className="text-lg font-medium">Confirm Password</label>
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white border-none rounded-xl py-6 mt-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-[rgba(137,221,247,1)] via-[rgba(137,221,247,1)] to-[rgba(255,255,255,1)] shadow-xl hover:shadow-lg duration-300 rounded-full py-7 font-bold text-2xl tracking-wider mt-4"
          >
            Update Password
          </Button>
        </form>
      </div>

      <div className="text-center flex justify-center items-center flex-1">
        <h1 className="text-6xl hidden md:block font-medium">
          Reset your password
        </h1>
      </div>
    </div>
  );
}
