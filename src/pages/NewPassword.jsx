import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post(`/user/reset-password/${token}`, {
        password,
      });
      console.log(token);
      setMessage("Password reset successful");
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.error || "Error resetting password ");
    }
  };

  return (
    <div className=" text-white min-h-screen flex justify-center items-center flex-col">
      <div className="bg-black px-10 py-10 flex flex-col gap-5">
        <div className="flex flex-row justify-center">
          <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className=" flex justify-center items-center flex-col gap-3">
            <div className="flex flex-row justify-center gap-3">
              <input
                type={showPassword1 ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="bg-gray-800 text-white p-2 mb-2"
              />
              <button>
                {showPassword1 ? (
                  <RiEyeCloseLine
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword1(!showPassword1);
                    }}
                  />
                ) : (
                  <RiEyeLine
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword1(!showPassword1);
                    }}
                  />
                )}
              </button>
            </div>
            <div className="flex flex-row justify-center gap-3">
              <input
                type={showPassword2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="bg-gray-800 text-white p-2 mb-2"
              />
              <button>
                {showPassword2 ? (
                  <RiEyeCloseLine
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword2(!showPassword2);
                    }}
                  />
                ) : (
                  <RiEyeLine
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword2(!showPassword2);
                    }}
                  />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && <p className="text-red-700">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
