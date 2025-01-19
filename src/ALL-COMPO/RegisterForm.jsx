import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from "./firebaseconfig";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // সঠিক আইকন ইম্পোর্ট
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const auth = getAuth(app);
    const [errt, setErrt] = useState("");
    const [sucss, setSucss] = useState("");
    const [passwrdLengErr, setPasswrdLengErr] = useState("");
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault(); // ফর্ম সাবমিট বন্ধ করা
        const email = event.target.email.value; // ইমেইল ফিল্ড থেকে মান নেওয়া
        const password = event.target.password.value; // পাসওয়ার্ড ফিল্ড থেকে মান নেওয়া
        const terms = event.target.check.checked; // টার্মস এন্ড কন্ডিশন চেক করা

        setErrt("");
        setSucss("");

        // পাসওয়ার্ড দৈর্ঘ্য যাচাই
        if (password.length < 6) {
            setPasswrdLengErr("Password should be more than six characters.");
            return;
        }

        // টার্মস চেক না করলে
        if (!terms) {
            setPasswrdLengErr("You must accept the terms and conditions.");
            return;
        }

        setPasswrdLengErr(""); // পূর্বের ত্রুটি বার্তা সাফ করা

        // Firebase Authentication দিয়ে নতুন ব্যবহারকারী তৈরি করা
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res);
                if (res.user.emailVerified) {
                    alert('user creat successfull');
                    navigate('/'); // হোম পেজে রিডাইরেক্ট
                } else {
                    navigate('/VerifyWarning'); // ইমেইল ভেরিফিকেশন পেজে রিডাইরেক্ট
                }

                // ইমেইল ভেরিফিকেশন পাঠানো
                sendEmailVerification(res.user)
                    .then(() => alert('please verifiy your email'))
                    .catch(err => console.log(err));
            })
            .catch((err) => setErrt(err.message)); // ত্রুটির বার্তা
    };

    

    



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Register
                </h2>
                <form onSubmit={handleRegister}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6 relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type={showPass ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <span
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-9 cursor-pointer"
                        >
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <div className="flex flex-row gap-2 mt-2">
                            <input type="checkbox" name="check" id="check" />
                            <p className="text-sm text-gray-600">Accept our terms and conditions</p>
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                    >
                        Register
                    </button>
                </form>

                {/* Error and Success Messages */}
                {errt && <p className="text-red-500 mt-3">{errt}</p>}
                {sucss && <p className="text-green-500 mt-3">{sucss}</p>}
                {passwrdLengErr && <p className="text-red-500 mt-3">{passwrdLengErr}</p>}

                {/* Already Have an Account */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to={'/'} className="text-blue-500 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
