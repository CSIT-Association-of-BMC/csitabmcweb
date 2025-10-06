import About from "./about/page";
import Event from "./events/page";
import HeroLander from "@/components/custom/HeroLander/HeroLander";
import Testimonial from "@/components/custom/Testimonial";
import { metadata } from "@/app/layout";
import CommunityPartners from "@/components/custom/CommunityPartners";


export default function Home() {
   metadata.title = "CSIT Association of BMC";
  metadata.description = "CSIT Association of Butwal Multiple Campus is Non profit and Non political IT Organization for emerging IT Students.";
  return (
    <>
    {/* <Lander/> */}
      <HeroLander/>
      <About/>
      <Event/>
      <Testimonial/>
      <CommunityPartners/>
    </>
  );
}
