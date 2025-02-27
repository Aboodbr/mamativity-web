import { NavLink } from "react-router-dom";
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

const links = [
  { name: "Home", path: "home", icon: navIcon1 },
  { name: "Months of pregnancy", path: "months-of-pregnancy", icon: navIcon2 },
  { name: "Pregnancy problems", path: "pregnancy-problems", icon: navIcon3 },
  { name: "Maternity bag", path: "maternity-bag", icon: navIcon4 },
  { name: "Mothers health", path: "mothers-health", icon: navIcon5 },
  { name: "Children and newborns", path: "children-newborns", icon: navIcon6 },
  {
    name: "Children's vaccinations",
    path: "childrens-vaccinations",
    icon: navIcon7,
  },
  { name: "Breastfeeding", path: "breastfeeding", icon: navIcon8 },

  // Admin Navbar
  { name: "Home", path: "admin/home", icon: navIcon8 },
  { name: "User Management", path: "admin/user-management", icon: navIcon8 },
  { name: "Content Management", path: "admin/content-management", icon: navIcon8 },
];

// eslint-disable-next-line react/prop-types
const HomeNav = ({ closeNav }) => {
  return (
    <nav className="bg-gradient-to-b from-[#FFCFFA] via-[#CBF3FF] to-[#CBF3FF] text-white p-4 h-screen w-[320px] fixed top-0 left-0 flex flex-col gap-3 rounded-2xl overflow-hidden">
      {/* Logo */}
      <NavLink to="/" className="w-full flex justify-center">
        <img className="w-28" src={logo} alt="logo" />
      </NavLink>

      {/* Navigation Links */}
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={closeNav} // Close the navigation when a link is clicked
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

              {/* Corner Image: Appears when active or hovered */}
              <span
                className={`absolute right-[12px] top-[-33px] size-10 rounded-br-full transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <img src={corner} alt="corner" />
              </span>
              <span
                className={`absolute right-[12px] bottom-[-33px] size-10 rounded-br-full transition-opacity  ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <img src={corner2} alt="corner" />
              </span>
            </>
          )}
        </NavLink>
      ))}

      {/* Settings Link */}
      <NavLink
        to="settings"
        onClick={closeNav} // Close the navigation when the settings link is clicked
        className={({ isActive }) =>
          `group flex items-center gap-5 font-semibold text-xl p-2 rounded-full transition-all absolute mx-auto bottom-8 w-full 
          ${
            isActive ? "bg-white text-gray-900" : "text-gray-900 hover:bg-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <img className="w-7" src={navIcon9} alt="Settings" />
            Settings
            {/* Corner Image */}
            <span
              className={`absolute right-[8px] top-[-33px] size-10 rounded-br-full transition-opacity ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <img src={corner} alt="corner" />
            </span>
            <span
              className={`absolute right-[8px] bottom-[-33px] size-10 rounded-br-full transition-opacity  ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <img src={corner2} alt="corner" />
            </span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default HomeNav;