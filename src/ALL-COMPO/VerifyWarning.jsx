import { getAuth, } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyWarning = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const user = auth.currentUser;
            if (user) {
                user.reload().then(() => {
                    if (user.emailVerified) {
                        clearInterval(interval); // ইন্টারভাল বন্ধ করুন
                        
                        navigate("/"); // রিডাইরেক্ট মূল পেজে
                    }
                });
            }
        }, 3000); // প্রতি ৩ সেকেন্ডে চেক করবে

        return () => clearInterval(interval); // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভাল বন্ধ করা
    }, [auth, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="text-gray-700 mt-4">
                    We have sent you a verification email. Please verify your email and wait, this page will redirect automatically once verified.
                </p>
            </div>
        </div>
    );
};

export default VerifyWarning;



// ১.রিয়েল - টাইম স্টেট আপডেট নিশ্চিত করতে setInterval ব্যবহার করুন
// যেহেতু Firebase অটোমেটিকভাবে ইমেল ভেরিফিকেশনের পরিবর্তন ডিটেক্ট করে না, তাই আপনি একটি টাইমার ব্যবহার করে user.reload() বারবার কল করতে পারেন।

// ২. কেন setInterval ব্যবহার করব ?
//     Firebase এর onAuthStateChanged শুধুমাত্র sign -in, sign - out বা token refresh এর মতো বড় পরিবর্তনের জন্য কাজ করে। তবে ইমেইল ভেরিফিকেশনের মতো ছোট স্টেট পরিবর্তন এটি ডিটেক্ট করে না।
// setInterval ব্যবহার করে user.reload() চেক করা একটি কার্যকর সমাধান।