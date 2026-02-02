import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom"; 
import "../App.css";

// Biar musiknya 1x dibuat dan bisa terus muter walau pindah halaman
let globalAudio = null;
let hasStarted = false;

function getGlobalAudio() {
  if (!globalAudio) {
    // Pastikan path benar untuk production (Vercel)
    const audioPath = "/starla.mp3";
    globalAudio = new Audio(audioPath);
    globalAudio.loop = true; // Biar muter terus
    globalAudio.volume = 0.7; // Volume 70%
    globalAudio.preload = "auto"; // Preload audio
    
    // Handle error loading audio
    globalAudio.addEventListener("error", (e) => {
      console.error("Error loading audio:", e);
      console.error("Audio path:", audioPath);
    });
    
    // Handle ketika audio berhasil dimuat
    globalAudio.addEventListener("canplaythrough", () => {
      console.log("Audio siap diputar!");
    });
  }
  return globalAudio;
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = getGlobalAudio();

    // Function untuk play musik dengan retry
    const tryPlay = async () => {
      if (hasStarted) return; // Jangan play lagi kalau udah mulai
      
      try {
        // Pastikan audio sudah dimuat
        if (audio.readyState >= 2) {
          await audio.play();
          hasStarted = true;
          console.log("✅ Musik mulai diputar!");
        } else {
          // Tunggu audio siap dulu
          audio.addEventListener("canplaythrough", async () => {
            try {
              await audio.play();
              hasStarted = true;
              console.log("✅ Musik mulai diputar setelah load!");
            } catch (err) {
              console.log("⚠️ Autoplay diblokir, tunggu interaksi user");
            }
          }, { once: true });
        }
      } catch (error) {
        console.log("⚠️ Autoplay diblokir:", error.message);
      }
    };

    // Coba autoplay langsung saat halaman load
    tryPlay();

    // Fallback: kalau autoplay gagal, tunggu interaksi user
    const handleInteraction = async () => {
      if (hasStarted) return;
      
      try {
        await audio.play();
        hasStarted = true;
        console.log("✅ Musik mulai setelah interaksi!");
        
        // Hapus listener setelah musik mulai
        window.removeEventListener("click", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("keydown", handleInteraction);
        window.removeEventListener("mousedown", handleInteraction);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    // Event listener untuk berbagai jenis interaksi (lebih banyak event)
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("mousedown", handleInteraction);

    // Cleanup: hapus listener aja, jangan stop musik biar tetap nyala di halaman lain
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("mousedown", handleInteraction);
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
        <button 
          className="btn" 
          onClick={() => {
            // Pastikan musik mulai saat klik tombol
            if (!hasStarted && globalAudio) {
              globalAudio.play().catch(() => {});
              hasStarted = true;
            }
            navigate("/letter");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
