import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

// Biar musiknya 1x dibuat dan bisa terus muter walau pindah halaman
let globalAudio = null;

function getGlobalAudio() {
  if (!globalAudio) {
    globalAudio = new Audio("/starla.mp3");
    globalAudio.loop = true; // Biar muter terus
    globalAudio.volume = 0.5; // Volume 50%
  }
  return globalAudio;
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = getGlobalAudio();

    // Play musik pas ada interaksi pertama user (ini yang paling stabil di Chrome)
    const tryPlay = () => {
      audio.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    };

    // Event listener untuk klik/tap pertama kali
    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true }); // Untuk mobile

    // Cleanup: hapus listener aja, jangan stop musik biar tetap nyala di halaman lain
    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []); 

  return (
    <div className="app">
      <div className="text-container">
        <div className="text">
          <Typewriter
            options={{
              strings: ["HAPPY BIRTHDAY 🎂"],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 50,
            }}
          />
        </div>
        <button className="btn" onClick={() => navigate("/letter")}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
