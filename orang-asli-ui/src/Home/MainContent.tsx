// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { WordList, Chatbot } from "../assets";

const MainContent = () => {
  return (
    <div className="flex-1 flex justify-center gap-20 items-stretch px-60 py-6">
      <div className="w-1/2 min-h-48 md:min-h-56 rounded-[50px] bg-[#f1ebe4] text-3xl text-primary-dark-brown shadow-[30px_30px_30px_#d5c9bd,-10px_-10px_60px_#d5c9bd]">
        <Link
          to="/word-list"
          className="h-full flex gap-6 items-center justify-center p-8"
        >
          <div className="w-1/6">
            <img src={WordList} alt="Word List" />
          </div>
          Word list
        </Link>
      </div>

      <div className="w-1/2 min-h-48 md:min-h-56 rounded-[50px] bg-[#f1ebe4] text-3xl text-primary-dark-brown shadow-[30px_30px_60px_#d5c9bd,-10px_-10px_30px_#d5c9bd]">
        <Link
          to="/chat-with-grandma"
          className="h-full flex gap-6 items-center justify-center p-8"
        >
          <div className="w-1/6">
            <img src={Chatbot} alt="Chatbot" />
          </div>
          Chat with <br />
          grandma
        </Link>
      </div>
    </div>
  );
};

export default MainContent;
