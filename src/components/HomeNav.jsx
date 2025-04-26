import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import logo from "@/assets/logo.png";
import navIcon1 from "@/assets/navIcon1.png";
import navIcon2 from "@/assets/navIcon2.png";
import navIcon3 from "@/assets/navIcon3.png";
import navIcon4 from "@/assets/navIcon4.png";
import navIcon5 from "@/assets/navIcon5.png";
import navIcon6 from "@/assets/navIcon6.png";
import navIcon7 from "@/assets/navIcon7.png";
import navIcon8 from "@/assets/navIcon8.png";
import navIcon9 from "@/assets/navIcon9.png";
import corner from "@/assets/corner.png";
import corner2 from "@/assets/corner2.png";

const HomeNav = ({ closeNav }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // دالة لتحديث حالة المستخدم إلى Unactive
  const setUserUnactive = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        status: "Unactive",
        lastActive: serverTimestamp(),
      });
      console.log(`User ${userId} set to Unactive`);
    } catch (error) {
      console.error("Error setting user unactive:", error);
    }
  };

  // دالة تسجيل الخروج
  const handleSignOut = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        await setUserUnactive(userId);
      }
      await signOut(auth);
      console.log("User signed out");
      navigate("/signin");
      closeNav();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // روابط المستخدم العادي
  const userLinks = [
    { name: "Home", path: "home", icon: navIcon1 },
    {
      name: "Months of pregnancy",
      path: "months-of-pregnancy",
      icon: navIcon2,
    },
    { name: "Pregnancy problems", path: "pregnancy-problems", icon: navIcon3 },
    { name: "Maternity bag", path: "maternity-bag", icon: navIcon4 },
    { name: "Mothers health", path: "mothers-health", icon: navIcon5 },
    {
      name: "Children and newborns",
      path: "children-newborns",
      icon: navIcon6,
    },
    {
      name: "Children's vaccinations",
      path: "childrens-vaccinations",
      icon: navIcon7,
    },
    { name: "Breastfeeding", path: "breastfeeding", icon: navIcon8 },
  ];

  // روابط الأدمن
  const adminLinks = [
    { name: "Admin Home", path: "admin/home", icon: navIcon8 },
    { name: "User Management", path: "admin/user-management", icon: navIcon8 },
    {
      name: "Content Management",
      path: "admin/content-management",
      icon: navIcon8,
    },
    { name: "Articles", path: "admin/articles", icon: navIcon8 },
    { name: "Settings", path: "settings", icon: navIcon9 },
  ];

  // تحديد الروابط بناءً على دور المستخدم
  const links =
    userRole === "admin" ? adminLinks : userRole === "user" ? userLinks : [];

  return (
    <nav
      className={`bg-gradient-to-b ${
        userRole === "admin"
          ? "from-[#94c3fc] via-[#CBF3FF]/70 to-[#CBF3FF]"
          : "from-[#FFCFFA] via-[#CBF3FF] to-[#CBF3FF]"
      } text-white p-4 h-screen w-[320px] fixed top-0 left-0 flex flex-col gap-3 rounded-2xl overflow-hidden`}
    >
      {/* Logo */}
      <NavLink to="/" className="w-full flex justify-center">
        <img className="w-28" src={logo} alt="logo" />
      </NavLink>

      {/* إذا كان التحميل لم ينتهِ بعد، اعرض "Loading..." */}
      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-900 mt-10">
          Loading...
        </p>
      ) : links.length > 0 ? (
        <>
          {/* قائمة الروابط */}
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeNav}
              className={({ isActive }) =>
                `group flex relative items-center gap-5 font-semibold text-xl pl-5 p-2 rounded-full transition-all w-[112%] 
                ${
                  isActive
                    ? "bg-white text-gray-900"
                    : "text-gray-900 hover:bg-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img className="w-7" src={link.icon} alt={link.name} />
                  {link.name}
                  <span
                    className={`absolute right-[12px] top-[-33px] size-10 rounded-br-full transition-opacity 
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <img src={corner} alt="corner" />
                  </span>
                  <span
                    className={`absolute right-[12px] bottom-[-33px] size-10 rounded-br-full transition-opacity 
                    ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <img src={corner2} alt="corner" />
                  </span>
                </>
              )}
            </NavLink>
          ))}
          {/* زر تسجيل الخروج */}
          <button
            onClick={handleSignOut}
            className="mt-auto mb-4 mx-4 flex items-center justify-center gap-3 bg-white/90 text-gray-900 font-semibold text-lg py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            <img className="w-6" src={navIcon9} alt="Sign Out" />
            Sign Out
          </button>
        </>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-900 mt-10">
          No access available.
        </p>
      )}
    </nav>
  );
};

HomeNav.propTypes = {
  closeNav: PropTypes.func,
};

export default HomeNav;
