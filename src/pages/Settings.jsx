"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [newEmail, setNewEmail] = useState("");
  const [retypeEmail, setRetypeEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  // Fetch user data from Firestore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        })
        .catch((error) => {
          Swal.fire(
            "Error",
            `Failed to fetch user data: ${error.message}`,
            "error"
          );
        });
    }
  }, [user]);

  // Handle input changes for userData fields
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated user data to Firestore
  const handleSaveAccountInfo = async () => {
    const result = await Swal.fire({
      title: "Save Changes",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        });
        Swal.fire(
          "Success",
          "Account information updated successfully!",
          "success"
        );
        setIsEditing(false); // Exit edit mode after saving
      } catch (error) {
        Swal.fire(
          "Error",
          `Failed to update account information: ${error.message}`,
          "error"
        );
      }
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account and all associated data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef); // Delete from Firestore
        await deleteUser(user); // Delete from Authentication
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        // Redirect to login or home page
        window.location.href = "/";
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          Swal.fire(
            "Error",
            "Please re-authenticate to delete your account.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            `Failed to delete account: ${error.message}`,
            "error"
          );
        }
      }
    }
  };

  // Change email
  const handleChangeEmail = async () => {
    if (newEmail !== retypeEmail) {
      Swal.fire("Error", "Emails do not match!", "error");
      return;
    }
    if (!currentPassword) {
      Swal.fire("Error", "Please enter your current password!", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Change Email",
      text: `Are you sure you want to change your email to ${newEmail}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail);
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { email: newEmail });
        Swal.fire(
          "Success",
          `Your email has been updated to ${newEmail}. You will receive an email at your old email address to revert the change.`,
          "success"
        );
        setNewEmail("");
        setRetypeEmail("");
        setCurrentPassword("");
        setUserData({ ...userData, email: newEmail });
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          Swal.fire(
            "Error",
            "Please re-authenticate to change your email.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            `Failed to change email: ${error.message}`,
            "error"
          );
        }
      }
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    if (newPassword !== retypePassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }
    if (!currentPassword) {
      Swal.fire("Error", "Please enter your current password!", "error");
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%]).{8,}$/.test(newPassword)
    ) {
      Swal.fire("Error", "Password does not meet requirements!", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Reset Password",
      text: "Are you sure you want to reset your password?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    });

    if (result.isConfirmed) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Swal.fire("Success", "Your password has been updated.", "success");
        setCurrentPassword("");
        setNewPassword("");
        setRetypePassword("");
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          Swal.fire(
            "Error",
            "Please re-authenticate to reset your password.",
            "error"
          );
        } else {
          Swal.fire(
            "Error",
            `Failed to reset password: ${error.message}`,
            "error"
          );
        }
      }
    }
  };

  return (
    <div className="p-4 md:p-6 mt-20 md:mt-5">
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
        <h1 className="text-2xl font-semibold">Settings</h1>
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
                onClick={() => setIsEditing(!isEditing)}
                className="bg-pink-200 border-[2px] border-pink-300 cursor-pointer text-black px-4 py-1 rounded-full text-lg font-medium"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full pb-2 border-transparent text-gray-500 ${
                    isEditing ? "focus:outline-none focus:border-blue-500" : ""
                  }`}
                />
              </div>
              <div className="border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full pb-2 border-transparent text-gray-500 ${
                    isEditing ? "focus:outline-none focus:border-blue-500" : ""
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full pb-2 border-transparent text-gray-500 ${
                    isEditing ? "focus:outline-none focus:border-blue-500" : ""
                  }`}
                />
              </div>
              <div className="border-gray-300 border-[1px] rounded-md px-2">
                <label className="block text-lg text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  disabled={!isEditing}
                  className={`w-full pb-2 border-transparent text-gray-500 ${
                    isEditing ? "focus:outline-none focus:border-blue-500" : ""
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleSaveAccountInfo}
                  className="w-full max-w-3xl bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full"
                >
                  Save
                </button>
              </div>
            )}

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full"
            >
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
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="New email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2 border-[1px] border-gray-300 rounded-md text-lg pl-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Retype the e-mail"
                  value={retypeEmail}
                  onChange={(e) => setRetypeEmail(e.target.value)}
                  className="w-full p-2 border-[1px] border-gray-300 rounded-md text-lg pl-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
            <div className="flex justify-center">
              <button
                onClick={handleChangeEmail}
                className="w-full max-w-3xl bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full"
              >
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

              <div className="relative">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  placeholder="Retype your password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
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
            </div>

            <div className="text-xs text-gray-600 mb-6">
              <p>
                The password must be at least 8 characters long and contain:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>At least 1 uppercase letter (A-Z)</li>
                <li>At least 1 lowercase letter (a-z)</li>
                <li>At least 1 number (0-9)</li>
                <li>At least 1 symbol (@ # $ %)</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleResetPassword}
                className="w-full max-w-3xl bg-gradient-to-r cursor-pointer from-blue-500 to-blue-300 text-white py-3 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
