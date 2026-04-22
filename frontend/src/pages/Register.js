import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} /><br/>
        <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} /><br/>
        <input placeholder="Course" onChange={(e) => setForm({...form, course: e.target.value})} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;