import { NenekSiti } from "../assets";
const MainChat = () => {
  const selectionsStyle =
    "block w-full p-[15px] mb-2 bg-white border-2 border-[#c37242] rounded-[10px] text-[#c37242] text-base text-left font-medium transition hover:bg-[#c37242] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] cursor-pointer";
  return (
    <>
      <div className="mb-5 animate-[fadeIn_0.5s_ease-in] flex gap-5">
        <div className="w-20 my-[15px]">
          <img
            src={NenekSiti}
            alt="nenek-siti-avatar"
            className="w-full object-cover"
          />
        </div>
        <div className="bg-[#f0f8ff] border-l-4 border-[#df722e] p-5 rounded-[10px] leading-[1.6]">
          <p className="mb-2">
            <strong className="text-[#c37242] text-[1.1em]">
              Selamat datang, cacok!
            </strong>
          </p>
          <p className="mb-2">
            <em className="text-[#666] italic">Welcome, grandchild!</em>
          </p>
          <p>
            I'm so happy you want to learn our beautiful Temuan language. Let's
            start with simple greetings, shall we?
          </p>
        </div>
      </div>

      <div className="p-5 px-8 bg-[#f9f9f9] border-t border-[#eee]">
        <button className={selectionsStyle}>Say hello to Yaak</button>
        <button className={selectionsStyle}>Ask how she is</button>
        <button className={selectionsStyle}>Ask to learn new words</button>
        <button className={selectionsStyle}>Talk about family</button>
      </div>
    </>
  );
};

export default MainChat;
