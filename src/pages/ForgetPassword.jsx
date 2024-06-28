import { useState } from "react";

import axiosInstance from "../utils/axiosInstance";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("user/forgotpassword", { email });
      setMessage("Check your email for the password reset link");
    } catch (error) {
      console.log(error.message);
      setMessage("Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="bg-black p-2 ">
        <div className="flex flex-row justify-center p-2">
          <h2 className="text-white text-2xl font-bold mb-4">
            Forgot Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 m-2 focus:outline-none focus:ring-2 bg-white text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Send Reset Link
          </button>
          
        </form>
        {message && <p className="text-red-400">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
