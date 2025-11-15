"use client";
import { useState } from "react";

export default function LogoutButtonWithModal() {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    window.location.href = "/api/auth/logout?returnTo=/";
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition-transform hover:scale-105"
      >
        Déconnexion
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center animate-fade-in">
            <p className="mb-6 text-gray-800 text-lg font-semibold">
              Voulez-vous vraiment vous déconnecter ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
              >
                Oui
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}