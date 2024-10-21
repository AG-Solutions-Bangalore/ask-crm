import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword"; 
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import FamilyMemberList from "./pages/familyMember/FamilyMemberList";
// import MahilaList from "./pages/mahila/MahilaList";
import LifeTimeMemberList from "./pages/lifeTimeMember/LifeTimeMemberList";
import PatronMemberList from "./pages/patronMember/PatronMemberList";
// import PendingMidList from "./pages/pendingMid/PendingMidList";
import NewRegisterList from "./pages/newRegister/NewRegisterList";
import DownloadReport from "./pages/download/DownloadReport";
import MemberView from "./pages/commonPage/MemberView";
import AddFamilyMember from "./pages/familyMember/AddFamilyMember";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberPrint from "./pages/memberPrint/MemberPrint";
import MemberEdit from "./pages/commonPage/MemberEdit";
import NewMidAssign from "./pages/commonPage/NewMidAssign";
import EditFamilyMember from "./pages/familyMember/EditFamilyMember";
// import SamajList from "./pages/samaj/SamajList";
const App = () => {
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />}  />
        
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/family-member" element={<FamilyMemberList />} />
        <Route path="/life-time-member" element={<LifeTimeMemberList />} />
        <Route path="/patron-member" element={<PatronMemberList />} />
        {/* <Route path="/pending-mid" element={<PendingMidList />} /> */}
        <Route path="/new-register" element={<NewRegisterList />} />
        <Route path="/new-mid-assign/:id" element={<NewMidAssign />} />
        <Route path="/download" element={<DownloadReport />} />
        {/* <Route path="/samaj" element={<SamajList />} />
        <Route path="/mahila" element={<MahilaList />} /> */}
        <Route path="/developer" element={<Home />} />
        <Route path="/member-view/:id" element={<MemberView />} />
        <Route path="/add-family-member" element={<AddFamilyMember />} />
        <Route path="/family-edit/:id" element={<EditFamilyMember />} />
        <Route path="/member-print/:id" element={<MemberPrint />} />
        <Route path="/member-edit/:id" element={<MemberEdit />} />
     
        <Route
          path="/change-password"
          element={<ProtectedRoute element={<ChangePassword />} />}
        />

        {/* <Route
          path="*"
          element={<ProtectedRoute element={<Navigate to="/" />} />}
        /> */}
      </Routes>
    </>
  );
};

export default App;
