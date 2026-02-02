import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TheBirthdayLetter() {
  const navigate = useNavigate();
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (imageSrc) => {
    setPopupImage(imageSrc);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  return (
    <div className="app">
      <div className="paper">
        <div className="letter">
          <p>Hi, happy birthday my ikoo!</p>
          <p>
            First of all, happy birthday, yeah, I didn't think I would know you,
            especially since you are the best person different from the others
            and congratulations on getting older, now it's legal, hahaha.i love
            u so much. i’m still waiting your latest update, jut hit me through
            dm. u know exactly where to find me.
          </p>
          <p>
            once more, hope Allah bless you and let happiness comes to you in
            every single seconds.
          </p>
          <p style={{ textAlign: "right" }}>with love,</p>
          <p style={{ textAlign: "right" }}>Luly</p>
        </div>
      </div>

      <div className="title">
        <p>ur best photo ? </p>
      </div>
      <div className="img-btn">
        <button
          className="img-button"
          onClick={() => openPopup("img/thanks-letter.png")}
        >
          <img src="img/letter2.png" alt="letter" className="img-small" />
          <span className="btn-text">First</span>
        </button>
        <button
          className="img-button"
          onClick={() => openPopup("img/sorry-letter.png")}
        >
          <img src="img/letter2.png" alt="letter" className="img-small" />
          <span className="btn-text">sorry</span>
        </button>
      </div>

      <div className="img-btn">
        <button
          className="img-button"
          onClick={() => openPopup("img/happy-letter.png")}
        >
          <img src="img/letter2.png" alt="letter" className="img-small" />
          <span className="btn-text">fav </span>
        </button>
        <button
          className="img-button"
          onClick={() => openPopup("img/sad-letter.png")}
        >
          <img src="img/letter2.png" alt="letter" className="img-small" />
          <span className="btn-text">funny</span>
        </button>
      </div>

      <button className="btn" onClick={() => navigate("/")}>
        That's It!
      </button>

      {popupImage && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={popupImage} alt="Popup" className="popup-image" />
            <button className="close-btn" onClick={closePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheBirthdayLetter;
