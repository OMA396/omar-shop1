import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // بيانات وهمية
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      navigate("/admin");
    } else {
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      navigate("/");
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}