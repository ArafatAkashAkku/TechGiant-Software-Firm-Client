import AboutUs from '../components/AboutUs.component';
import Client from '../components/Client.component';
import ContactUs from '../components/ContactUs.component';
import HeroSlider from '../components/HeroSlider.component';
import Testimonials from '../components/Testimonials.component';

const HomePage = () => (
  <>
   <HeroSlider/>
   <AboutUs/>
   <Testimonials/>
   <Client/>
   <ContactUs/>
  </>
);

export default HomePage;
