import "./ProfileScreen.css";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import PlanScreen from "./PlanScreen";

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Navbar></Navbar>
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt="avatar"
          />
          <div className="profileScreen_details">
            <h2>{user}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <PlanScreen></PlanScreen>
              <button
                className="profileScreen_SignOut"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
