import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./Banner";
import OurPartners from "./OurPartners";
import PopularCourses from "./PopularCourse/PopularCourses";
import Testimonials from "./Testimonials/Testimonials";
import StatsSection from "./StatsSection/StatsSection";
import {
  ExtraSectionOne,
  JoinAsTeacherSection,
  WhyEduManageSection,
} from "./JoinAsTeacher/JoinAsTeacher";

const Home = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 1000,
      easing: "ease",
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>EduManage | Home</title>
      </Helmet>
      <div data-aos="fade-down" data-aos-delay="100" data-aos-duration="1000">
        <Banner />
      </div>
      <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
        <OurPartners />
      </div>
      <div data-aos="zoom-out" data-aos-delay="300" data-aos-duration="1000">
        <PopularCourses />
      </div>

      <div data-aos="flip-left" data-aos-delay="700" data-aos-duration="1000">
        <Testimonials />
      </div>
      <div data-aos="zoom-in" data-aos-delay="600" data-aos-duration="1000">
        <StatsSection />
      </div>
      <div data-aos="zoom-in" data-aos-delay="600" data-aos-duration="1000">
        <JoinAsTeacherSection />
      </div>
      <div data-aos="fade-down" data-aos-delay="500" data-aos-duration="1000">
        <ExtraSectionOne />
      </div>
      <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
        <WhyEduManageSection />
      </div>
    </div>
  );
};

export default Home;
