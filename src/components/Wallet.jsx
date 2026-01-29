import React from "react";
import QRCode from "react-qr-code";
import { IndianRupee, Wallet as WalletIcon } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Wallet = ({ balance, uid, isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-24 right-4 md:right-10 z-50 w-80 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-3xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <WalletIcon className="w-6 h-6 text-blue-600" />
                                My Wallet
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-black/5 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Balance */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Current Balance</p>
                            <div className="flex items-center gap-1">
                                <IndianRupee className="w-8 h-8" />
                                <span className="text-4xl font-bold tracking-tight">{balance}</span>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                {uid ? (
                                    <QRCode
                                        value={uid}
                                        size={160}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                    />
                                ) : (
                                    <div className="w-40 h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                                        No User ID
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 text-center max-w-[200px]">
                                Scan this QR at the gate to access the parking facility.
                            </p>
                        </div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};

export default Wallet;
