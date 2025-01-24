import Hero from './_components/hero';
import Features from './_components/features';
import HowItWorks from './_components/how-it-works';
import Testimonials from './_components/testimonials';
import Pricing from './_components/pricing';
import AboutUs from './_components/about-us';
import FAQs from './_components/faqs';
import Footer from './_components/footer';

const HomePage = () => {
  return (
    <main className='mt-[60px] h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth'>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <AboutUs />
      <FAQs />
      <Footer />
    </main>
  );
};

export default HomePage;
