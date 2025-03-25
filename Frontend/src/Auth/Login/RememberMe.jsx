import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const RememberMe = () => {
    return (
        <div className="flex justify-between items-center w-full text-sm !mt-4">
            {/* Left Section - Remember Me */}
            <label className="flex items-center gap-2 text-text cursor-pointer">
                <FaCheckCircle size={12} className="text-text" />
                <span className="text-[10px]">Remember me</span>
            </label>

            {/* Right Section - Forgot Password */}
            <Link to="/forgot-password" className="font-medium text-sm">
                Forgot password?
            </Link>
        </div>
    );
};

export default RememberMe;
