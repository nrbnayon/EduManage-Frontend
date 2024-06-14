import SectionTitle from "./../Shared/BgCard/SectionTitle";
import ProgrammingHeroLogo from "../../assets/p1.jpeg";
import OstadLogo from "../../assets/p3.png";
import LearnWithSumitLogo from "../../assets/p2.png";
import RoadSideCoderLogo from "../../assets/p4.jpg";
import Marquee from "react-fast-marquee";
const OurPartners = () => {
  const header = {
    title: "---Our---",
    desc: "Partnership with",
  };
  const partners = [
    {
      name: "Programming Hero",
      logo: ProgrammingHeroLogo,
      description: "Partnering to provide top-notch programming education.",
    },
    {
      name: "Ostad",
      logo: OstadLogo,
      description: "Collaborating on innovative educational solutions.",
    },
    {
      name: "Learn With Sumit",
      logo: LearnWithSumitLogo,
      description: "Joining forces to bring hands-on learning experiences.",
    },
    {
      name: "RoadSide Coder",
      logo: RoadSideCoderLogo,
      description: "Working together to make coding accessible to all.",
    },
  ];
  return (
    <div>
      <SectionTitle header={header} />
      <section className="py-4 ">
        <Marquee pauseOnHover={true} speed={50} direction="right">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white p-6 cursor-pointer  rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300  transform  hover:bg-blue-100"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-32 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold text-center text-gray-700 mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-center">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </Marquee>
      </section>
    </div>
  );
};

export default OurPartners;
