import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import SignUp from "./pages/SingUp";
import SignIn from "./pages/SignIn";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/Home";
import MonthsOfPregnancy from "./pages/MonthsOfPregnancy";
import PregnancyProblems from "./pages/PregnancyProblems";
import MaternityBag from "./pages/MaternityBag";
import MothersHealth from "./pages/MothersHealth";
import ChildrenNewborns from "./pages/ChildrenNewborns";
import ChildrensVaccinations from "./pages/ChildrensVaccinations";
import Breastfeeding from "./pages/Breastfeeding";
import Settings from "./pages/Settings";
import MonthDetails from "./pages/MonthDetails"; 
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verification from "./pages/Verification";
import Hero from "./pages/Hero";
import DashboardPage from "./pages/admin/DashBoard";
import UsersManagement from "./pages/admin/UsersManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import AdminMonthDetails from "./pages/admin/AdminMonthDetails";
import Articles from "./pages/admin/Articles";
import NewArticle from "./pages/admin/NewArticle";
import PregnancyGuide from "./pages/PregnancyProblemsDetail";

function App() {
  return (
    <Routes>

      {/* Main Routes  */}
      <Route path="/" element={<HomeLayout />}>
        <Route path="home" index element={<Home />} />
        <Route path="months-of-pregnancy" element={<MonthsOfPregnancy />} />
        <Route path="pregnancy-problems" element={<PregnancyProblems />} />
        <Route path="maternity-bag" element={<MaternityBag />} />
        <Route path="mothers-health" element={<MothersHealth />} />
        <Route path="children-newborns" element={<ChildrenNewborns />} />
        <Route
          path="childrens-vaccinations"
          element={<ChildrensVaccinations />}
        />
        <Route path="breastfeeding" element={<Breastfeeding />} />
        <Route path="settings" element={<Settings />} />
        <Route path="month/:monthId" element={<MonthDetails />} />
        <Route path="pregnancy-problems/:monthId" element={<PregnancyGuide />} />
      </Route>


      {/* Admin Routes  */}
      <Route path="" element={<HomeLayout />}>
        <Route path="/admin/home"  element={<DashboardPage />} />
        <Route path="/admin/user-management"  element={<UsersManagement />} />
        <Route path="/admin/content-management"  element={<ContentManagement />} />
        <Route path="/admin/articles"  element={<Articles />} />
        <Route path="/admin/articles/add-new-article"  element={<NewArticle />} />
        <Route path="/admin/content-management/:month"  element={<AdminMonthDetails />} />
      </Route>

      {/* Validation Routes  */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Hero />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verification" element={<Verification />} />
      </Route>
    </Routes>
  );
}

export default App;
