import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SubHeading } from "../components/subHeading";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom"; // Redirect after login

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token); // Store JWT token
        navigate("/dashboard"); // Redirect after login
      }
    } catch (error) {
      toast.error("Login failed! " + (error.response?.data?.message || "Try again"));
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
          <Heading label={"Login"} />
          <SubHeading label={"Login to your account"} />
          <form onSubmit={handleLogin}>
            <InputBox 
              label={"Email"} 
              placeholder={"abc@gmail.com"} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox 
              label={"Password"} 
              placeholder={"Enter password"} 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-4">
              <Button label={"Login"} type="submit" />
            </div>
          </form>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}

export default Login;
