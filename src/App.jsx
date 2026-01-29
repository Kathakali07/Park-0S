import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth } from "./firebase";
import database from "./firebase";
import Navbar from "./components/Navbar";
import NearbyButton from "./components/NearbyButton";
import ParkingList from "./components/ParkingList";
import ParkingDetail from "./components/ParkingDetail";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [userLoc, setUserLoc] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetch User Data (Wallet)
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.walletBalance) {
            setWalletBalance(data.walletBalance);
          }
        });
      } else {
        setCurrentUser(null);
        setWalletBalance(0);
      }
    });
    return () => unsubscribe();
  }, []);

  const getGeolocation = () => {
    setIsSearching(true);
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsSearching(false);
      },
      () => {
        setErrorMsg("Cant get location. Please check permissions or move to a different area.");
        setIsSearching(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#f8fafc,_#eff6ff)] text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <Navbar currentUser={currentUser} walletBalance={walletBalance} />

      <main className="max-w-6xl mx-auto p-6 pt-24">
        <AnimatePresence mode="wait">
          {!selectedSlot ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <NearbyButton onClick={getGeolocation} loading={isSearching} />
                {errorMsg && (
                  <div className="mt-6 bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-600 px-6 py-3 rounded-2xl font-medium">
                    {errorMsg}
                  </div>
                )}
              </div>

              {userLoc && (
                <div className="mt-10">
                  <ParkingList userLoc={userLoc} onSelect={setSelectedSlot} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ParkingDetail
                slot={selectedSlot}
                onBack={() => setSelectedSlot(null)}
                currentUser={currentUser}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;