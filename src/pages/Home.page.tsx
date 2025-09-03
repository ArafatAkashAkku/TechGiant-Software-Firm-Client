import AboutUs from '../components/AboutUs.component';
import Blog from '../components/Blog.component';
import Client from '../components/Client.component';
import ContactUs from '../components/ContactUs.component';
import HeroSlider from '../components/HeroSlider.component';
import Testimonials from '../components/Testimonials.component';

const HomePage = () => (
  <>
    <HeroSlider />
    <section id="about">
      <AboutUs />
    </section>
    <Testimonials />
    <section id="services">
      <Client />
    </section>
    <Blog />
    <section id="contact">
      <ContactUs />
    </section>
  </>
);

export default HomePage;
