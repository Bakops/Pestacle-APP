"use client";

import React from "react";
import styles from "../styles/AnimationSlider.module.css";

export default function PestacleNewsletterSection() {
  return (
    <section className="w-full">
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

      <div className="relative bg-[#6320EE] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/spectacle-8.png')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative py-20 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Abonnez-vous à notre newsletter et ne manquez rien !
          </h2>
          <p className="mb-6 text-lg max-w-2xl mx-auto opacity-90">
            Recevez les dernières nouveautés streetwear, les tendances 2025 et
            des offres exclusives directement dans votre boîte mail.
          </p>

          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="w-full sm:w-auto grow px-4 py-3 bg-white rounded-full text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-[#6320EE] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition"
            >
              S’abonner
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
