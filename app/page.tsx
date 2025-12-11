import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedShows } from "@/components/featured-shows"
import { UpcomingShows } from "@/components/upcoming-shows"
import { Footer } from "@/components/footer"
import PestacleExplorerSection from "@/components/sections-experience-pestacle"
import PestacleNewsletterSection from "@/components/sections-newsletter-pestacle"


export default function HomePage() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedShows />
        <UpcomingShows /> 
        <PestacleExplorerSection />
        <PestacleNewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

