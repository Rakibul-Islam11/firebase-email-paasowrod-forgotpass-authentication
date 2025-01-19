import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "./firebaseconfig";
import { useState } from "react";

const LoginForm = () => {
    const auth = getAuth(app);
    const [errt, setErrt] = useState("");
    const [logSuccess, setLogSuccess] = useState('')
    const [getEmail, setGetEmail] = useState('');
    const [forgotPassErr, setForgotPassErr] = useState('');
    
    const handleLoginFrm = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setLogSuccess('')
        setErrt('')
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user);
                
                setLogSuccess('login succesfull')
                if (res.user.emailVerified) {
                    alert('user creat successfull')
                } else {
                    alert('please verify your email')
                }
            })
            .catch(err => {
                console.log(err);
                
                setErrt(err.message)
            })
        
        
    }
    const handleForgotPass = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // রেগুলার এক্সপ্রেশন

        if (!getEmail) {
            setForgotPassErr('Enter your email'); // যদি ইমেইল ফাঁকা থাকে
            return;
        } else if (!emailRegex.test(getEmail)) {
            setForgotPassErr('Invalid email address'); // ইমেইল ফরম্যাট সঠিক না হলে
            return;
        } else {
            setForgotPassErr(''); // ত্রুটির বার্তা সাফ
            // এখানে আপনি পাসওয়ার্ড রিসেটের জন্য প্রয়োজনীয় লজিক যুক্ত করতে পারেন
            console.log("Password reset email sent to:", getEmail);
        }
        // পাসওয়ার্ড রিসেট ইমেইল পাঠানোর জন্য Firebase ফাংশন
        sendPasswordResetEmail(auth, getEmail)
            .then((res) => {
                alert("Please check your email for the reset link.");
                console.log(res);
                
            })
            .catch((err) => {
                console.error(err); // ত্রুটির মেসেজ দেখানো হবে
                setForgotPassErr("Failed to send reset email. Please try again.");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    লগইন করুন
                </h2>
                <form onSubmit={handleLoginFrm} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            ইমেইল
                        </label>
                        <input
                            onChange={email => setGetEmail(email.target.value)}
                            type="email"
                            id="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                    </div>
                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link onClick={handleForgotPass} className="text-sm text-yellow-500 hover:underline">
                            পাসওয়ার্ড ভুলে গেছেন?
                        </Link>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        লগইন
                    </button>
                </form>
                {/* Footer */}
                <p className="text-sm text-center text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link to={'/register'} className="font-medium text-yellow-500 hover:underline">

                        অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </p>
                {
                    errt && <p>{ errt }</p>
                }
                {
                    logSuccess && <p>{logSuccess }</p>
                }
                {
                    forgotPassErr && <p>{forgotPassErr }</p>
                }
            </div>
        </div>
    );
};

export default LoginForm;
