import MainChat from "./MainChat";
import LanguageInfo from "./LanguageInfo";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,#f5f1e8_0%,#e8dcc0_100%)] text-[#5d4e37]">
      <div className="max-w-[800px] mx-auto">
        <header className="relative text-center mb-8">
          <MoveLeft size={40}
            className="absolute top-5 left-10 text-[#793d2b] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-[#8b4513] text-4xl font-bold mb-2">
            🏡 Yaak's Language Corner
          </h1>
          <p className="italic text-[#6b5b47] text-[1.1em]">
            Learn Orang Asli languages with your virtual grandmother
          </p>
        </header>

        <div className="bg-white rounded-[20px] shadow-xl overflow-hidden">
          <div className="p-8 max-h-[550px] overflow-y-auto bg-[#fefefe]">
            <MainChat />
          </div>

          <LanguageInfo />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
