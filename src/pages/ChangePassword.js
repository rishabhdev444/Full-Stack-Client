import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../helpers/AuthContext";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const changePassword = () => {
    axios
      .put(
        "http://localhost:4200/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Password Changes Successfully!!");
          localStorage.removeItem("accessToken");
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
          navigate("/login");
        }
      });
  };
  return (
    <div>
      <h1>Change Your Password</h1>
      <input
        type="text"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
        placeholder="Old Password..."
      />

      <input
        type="text"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        placeholder="New Password..."
      />
      <button onClick={changePassword}>Update Password</button>
    </div>
  );
}

export default ChangePassword;
