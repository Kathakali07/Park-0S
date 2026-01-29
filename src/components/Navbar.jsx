import { useState } from "react";
import { Menu, Wallet as WalletIcon, User } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import Wallet from "./Wallet";

const Navbar = ({ onHome, currentUser, walletBalance }) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 h-20 bg-white/30 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-4 md:px-10 shadow-sm transition-all duration-300">
        {/* Logo */}
        <div
          className="text-slate-800 text-2xl font-extrabold cursor-pointer tracking-tight"
          onClick={onHome}
        >
          Park-0S
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <button
              onClick={() => setIsWalletOpen(!isWalletOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/40 rounded-full shadow-sm hover:bg-white/60 transition active:scale-95 group"
            >
              <WalletIcon className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-slate-700">₹{walletBalance}</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 bg-slate-900 text-white rounded-full font-semibold shadow-lg hover:bg-slate-800 transition active:scale-95 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu (Visual Only for now) */}
          <button className="p-2 rounded-full hover:bg-white/40 transition active:scale-95 text-slate-700 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Wallet Modal */}
      <Wallet
        balance={walletBalance}
        uid={currentUser?.uid}
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />
    </>
  );
};

export default Navbar;
