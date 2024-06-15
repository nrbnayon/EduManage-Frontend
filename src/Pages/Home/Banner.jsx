import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import B1 from "../../assets/b1.jpeg";
import B2 from "../../assets/b2.jpeg";
import B3 from "../../assets/reg3.jpeg";
import B4 from "../../assets/b3.jpeg";
import B5 from "../../assets/b4.jpeg";
// import B6 from "../../assets/reg1.jpeg";
const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
        <div className="w-full h-[600px]">
          <img src={B1} className="w-full h-full" />
        </div>
        <div className="w-full h-[600px]">
          <img src={B2} className="w-full h-full" />
        </div>
        <div className="w-full h-[600px]">
          <img src={B3} className="w-full h-full" />
        </div>
        <div className="w-full h-[600px]">
          <img src={B4} className="w-full h-full" />
        </div>
        <div className="w-full h-[600px]">
          <img src={B5} className="w-full h-full" />
        </div>
        {/* <div>
          <img src={B6} />
        </div> */}
      </Carousel>
    </div>
  );
};

export default Banner;
