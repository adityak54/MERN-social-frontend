import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) {
      return;
    }
    try {
      const response = await axiosInstance.post("/user/signup", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        console.log("User created successfully", response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        console.log("Error creating user");
        setError(response.data.error);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      } else {
        setError("Network error, please try again later");
        console.log(error.message);
      }
    }
  };

  const validateSignup = () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError(null);
    return true;
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black p-8 rounded-lg shadow-lg">
        <div className="flex flex-row justify-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-row items-center mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="bg-gray-700 text-white rounded-lg py-2 px-4 w-full"
                required
              />
              <button onClick={togglePasswordVisibility} className="ml-2">
                {showPassword ? (
                  <RiEyeCloseLine className="text-white" />
                ) : (
                  <RiEyeLine className="text-white" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-700 text-sm pb-3">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
