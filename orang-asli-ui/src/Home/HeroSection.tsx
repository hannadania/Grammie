import { GrammieIllustration } from "../assets";

const HeroSection = () => {
  return (
    <div className="flex gap-20 justify-center items-center py-12 px-40">
      <div className="w-96">
        <img
          src={GrammieIllustration}
          alt="Grammie Illustration"
          className="w-full object-cover"
        />
      </div>

      <h1 className="justify-self-start text-8xl text-primary-dark-brown font-bold">
        Preserve our <br/> 
        Orang Asli <br/>
        Language
      </h1>
    </div>
  );
};

export default HeroSection;
