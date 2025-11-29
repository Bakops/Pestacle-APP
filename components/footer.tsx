import Link from "next/link"
import { Ticket, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
    return ( 
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="LOGO_PESTACLE.png" className="w-32" alt="Logo Pestacle" />
                        </div>
                        <p className="text-primary-foreground/80 text-sm mb-4">
                            Votre plateforme de réservation en ligne pour les meilleurs spectacles et pestacles en France.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="text-primary-foreground/80 hover:text-[#FF6B6B] transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-primary-foreground/80 hover:text-[#FF6B6B] transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-primary-foreground/80 hover:text-[#FF6B6B] transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-primary-foreground/80 hover:text-[#FF6B6B] transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Spectacles</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Pestacles Mécaniques
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Comédies Musicales
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Théâtre Classique
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Promotions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Informations</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Nos Salles
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Abonnements
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Cartes Cadeaux
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Groupes & Scolaires
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                    Accessibilité
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-primary-foreground/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-primary-foreground/60 text-sm">© 2026 Pestacle. Tous droits réservés.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                Mentions légales
                            </Link>
                            <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                Politique de confidentialité
                            </Link>
                            <Link href="#" className="relative hover:text-[#FFF] after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-0.5 after:w-0 after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:after:w-full text-sm">
                                CGV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
