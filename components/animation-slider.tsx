"use client";
import React from "react";
import styles from "../styles/AnimationSlider.module.css";

const AnimatedBanner: React.FC = () => {
  return (
    <div id="anime3" className={styles.messagedefilant}>
      <div>
        <span>
          Nouveautés exclusives ·{" "}
          <span className={styles.anime_transform}>Streetwear 2025</span> ·
        </span>
        <span>
          Livraison rapide partout ·{" "}
          <span className={styles.anime_transform}>Dès 48h</span> ·
        </span>
        <span>
          Style urbain et tendance ·{" "}
          <span className={styles.anime_transform}>
            Découvrez la collection
          </span>{" "}
          ·
        </span>
        <span>
          Offres spéciales limitées ·{" "}
          <span className={styles.anime_transform}>Shoppez maintenant</span> ·
        </span>
      </div>
    </div>
  );
};

export default AnimatedBanner;
