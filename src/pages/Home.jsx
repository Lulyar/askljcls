import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

// Biar musiknya 1x dibuat dan bisa terus muter walau pindah halaman
let globalAudio = null;
let hasStarted = false;

function getGlobalAudio() {
  if (!globalAudio) {
    globalAudio = new Audio("/starla.mp3");
    globalAudio.loop = true; // Biar muter terus
    globalAudio.volume = 0.5; // Volume 50%
    globalAudio.preload = "auto"; // Preload audio
  }
  return globalAudio;
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = getGlobalAudio();

    // Function untuk play musik
    const tryPlay = () => {
      if (hasStarted) return; // Jangan play lagi kalau udah mulai
      
      audio.play()
        .then(() => {
          hasStarted = true;
          console.log("Musik mulai diputar!");
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    };

    // Coba autoplay langsung saat halaman load
    tryPlay();

    // Fallback: kalau autoplay gagal, tunggu interaksi user
    const handleInteraction = () => {
      tryPlay();
      // Hapus listener setelah musik mulai
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Event listener untuk berbagai jenis interaksi
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    // Cleanup: hapus listener aja, jangan stop musik biar tetap nyala di halaman lain
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
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
