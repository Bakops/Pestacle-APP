"use client";


export default function PestacleNewsletterSection() {
  return (
    <section className="w-full">
      <div className="relative bg-[#FF6B6B] text-white overflow-hidden">
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
              className="w-full sm:w-auto grow px-4 py-3 bg-white rounded-full text-gray-800 focus:outline-none placeholder:text-sm text-sm"
              required
            />
            <button
              type="submit"
              className="bg-white text-[#FF6B6B] font-semibold hover:bg-[#FF6B6B] hover:text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition cursor-pointer"
            >
              S’abonner
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
