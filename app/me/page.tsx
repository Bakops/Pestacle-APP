import LogoutButtonWithModal from "@/components/LogoutButtonWithModal";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

const MePage = async () => {
  const data = await getSession();

  const progressionCours = [
    { nom: "Bases de JavaScript", leçonsComplétées: 8, totalLeçons: 10 },
    { nom: "Fondamentaux de React", leçonsComplétées: 5, totalLeçons: 12 },
    { nom: "Fondamentaux de Python", leçonsComplétées: 7, totalLeçons: 12 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#c3cc50]/30 via-white to-[#c3cc50]/10 transition-all duration-500">
      {/* Barre latérale animée */}
      <aside className="bg-gray-800 text-white w-64 p-4 shadow-lg flex flex-col justify-between animate-fade-in-left">
        <div>
          <h2 className="text-2xl font-bold font-poppins mb-6 tracking-wide animate-fade-in-down">
            Tableau de bord
          </h2>
          <nav>
            <ul>
              <li className="mb-4 transition-transform hover:scale-105">
                <a href="#profil" className="hover:text-[#c3cc50] font-poppins">
                  Profil
                </a>
              </li>
              <li className="mb-4 transition-transform hover:scale-105">
                <a href="#cours" className="hover:text-[#c3cc50]">
                  Cours
                </a>
              </li>
              <li className="mb-4 transition-transform hover:scale-105">
                <a href="#leçons" className="hover:text-[#c3cc50]">
                  Leçons
                </a>
              </li>
              <li className="mb-4 transition-transform hover:scale-105">
                <a href="#paramètres" className="hover:text-[#c3cc50]">
                  Paramètres
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-xs text-gray-400 mt-8 animate-fade-in-up">
          © 2025 Knowly
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 bg-transparent p-6 flex flex-col items-center animate-fade-in">
        <div className="bg-white/90 shadow-2xl rounded-2xl p-8 mt-10 mx-auto w-full md:w-3/4 lg:w-2/3 transition-all duration-500">
          <div className="flex justify-end">
            <LogoutButtonWithModal />
          </div>
          <div className="flex flex-col items-center mb-4">
            <div className="relative group">
              <Image
                className="rounded-full border-8 border-[#c3cc50] shadow-lg transition-transform duration-300 group-hover:scale-105"
                src={data?.user?.picture}
                alt="Photo de profil"
                width={120}
                height={120}
                priority
              />
              <span className="absolute bottom-0 right-0 bg-[#c3cc50] text-xs px-2 py-1 rounded-full shadow animate-bounce">
                {data?.user?.nickname?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <h1 className="text-lg text-center text-gray-700 mb-2 font-bold tracking-wide animate-fade-in-down">
            <span className="font-semibold">Nom :</span> {data?.user?.nickname}
          </h1>
          <h2 className="text-md text-center text-gray-700 mb-4 animate-fade-in-down">
            <span className="font-semibold">Email :</span> {data?.user?.name}
          </h2>

          <div className="mt-6">
            <h3 className="text-md text-gray-800 font-bold font-po mb-4 animate-fade-in-up">
              Progression des cours
            </h3>
            <div className="space-y-6">
              {progressionCours.map((cours, index) => {
                const percent = Math.round(
                  (cours.leçonsComplétées / cours.totalLeçons) * 100
                );
                return (
                  <div
                    key={index}
                    className="mb-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                  >
                    <label className="block text-gray-700 font-semibold mb-1">
                      {cours.nom}
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className="bg-[#c3cc50] h-4 rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {cours.leçonsComplétées} sur {cours.totalLeçons} leçons
                      complétées ({percent}%)
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Animations CSS */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s both;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.7s both;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s both;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s both;
        }
      `}</style>
    </div>
  );
};

export default MePage;