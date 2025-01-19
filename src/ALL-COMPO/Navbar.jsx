import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white w-1/2 mx-auto">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold">
                    Logo
                </a>

                {/* Menu Items */}
                <div className="hidden md:flex space-x-6">
                    <Link to={'/'} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                        Login
                    </Link>
                
                    <Link to={'/register'} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        id="menu-button"
                        aria-label="Open Menu"
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="md:hidden bg-gray-800">
                <a
                    href="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                    Register
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
