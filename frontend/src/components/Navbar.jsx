import { SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition" onClick={() => navigate("/")}>
            <span className="text-3xl"></span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              BlogSphere
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/all")}
              className={`font-medium transition ${
                isActive("/all") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Explore
            </button>
            
            <SignedIn>
              <button
                onClick={() => navigate("/my")}
                className={`font-medium transition ${
                  isActive("/my") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Stories
              </button>
              <button
                onClick={() => navigate("/new")}
                className={`font-medium transition ${
                  isActive("/new") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Write
              </button>
            </SignedIn>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal" redirectUrl="/all">
                <button className="text-gray-600 hover:text-gray-900 font-medium">Sign In</button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-600 hover:text-gray-900 font-medium hidden sm:block"
              >
                Profile
              </button>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
