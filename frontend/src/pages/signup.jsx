import { useState } from "react";
import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { SubHeading } from "../components/subHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await axios.post("localhost:3000/api/v1/user/signup", {
        email,
        password,
        firstName,
        lastName,
      });

      toast.success("Signup successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Signup failed! " + (error.response?.data?.message || "Try again"));
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={(e) => setFirstname(e.target.value)}
            value={firstName}
            label={"First Name"}
            placeholder="Enter your first name"
          />
          <InputBox
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}
            label={"Last Name"}
            placeholder="Enter your last name"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label={"Email"}
            placeholder="Enter your email"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label={"Password"}
            type="password"
            placeholder="Enter your password"
          />

          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign Up"} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
