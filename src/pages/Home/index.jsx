import SEO from '../../components/common/SEO'
import Hero from '../../components/home/Hero'
import AboutPreview from '../../components/home/AboutPreview'
import ServicesPreview from '../../components/home/ServicesPreview'
import WhyChooseUs from '../../components/home/WhyChooseUs'
import FeaturedProjects from '../../components/home/FeaturedProjects'
import ProcessSection from '../../components/home/ProcessSection'
import Industries from '../../components/home/Industries'
import BeforeAfter from '../../components/home/BeforeAfter'
import LogoCarousel from '../../components/home/LogoCarousel'
import Testimonials from '../../components/home/Testimonials'
import TeamPreview from '../../components/home/TeamPreview'
import NewsPreview from '../../components/home/NewsPreview'
import FAQPreview from '../../components/home/FAQPreview'
import ParallaxBanner from '../../components/home/ParallaxBanner'
import ContactBanner from '../../components/home/ContactBanner'

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
          description="MaxBuild Infrastructure delivers world-class residential, commercial, and industrial projects with uncompromising quality."
        path="/"
      />
      <Hero />
      <LogoCarousel />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <FeaturedProjects />
      <BeforeAfter />
      <ProcessSection />
      <Industries />
      <ParallaxBanner />
      <Testimonials />
      <TeamPreview />
      <NewsPreview />
      <FAQPreview />
      <ContactBanner />
    </>
  )
}
