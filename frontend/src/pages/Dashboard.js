import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const token = localStorage.getItem("token");

  // 🔐 Protect route
  useEffect(() => {
  if (!token) {
    navigate("/login");
  }
}, [token, navigate]);
  // 🔹 Update Course
 const updateCourse = async () => {
  try {
    await API.put("/update-course", 
      { course },   // data
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    alert("Course updated");
  } catch {
    alert("Error updating course");
  }
};

  // 🔹 Update Password
 const updatePassword = async () => {
  try {
    await API.put("/update-password", 
      passwords,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    alert("Password updated");
  } catch {
    alert("Error updating password");
  }
};

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Update Course</h3>
      <input placeholder="New Course" onChange={(e) => setCourse(e.target.value)} />
      <button onClick={updateCourse}>Update Course</button>

      <h3>Update Password</h3>
      <input type="password" placeholder="Old Password"
        onChange={(e) => setPasswords({...passwords, oldPassword: e.target.value})} />
      <br/>
      <input type="password" placeholder="New Password"
        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} />
      <br/>
      <button onClick={updatePassword}>Update Password</button>

      <br/><br/>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;