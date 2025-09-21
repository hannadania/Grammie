const LanguageInfo = () => {
  return (
    <div className="p-5 px-8 bg-[#f0f8ff] border-t border-[#e0e0e0]">
      <h4 className="text-[#8b4513] mb-2 text-base">
        About Temuan Language
      </h4>
      <p className="leading-[1.5] text-[#666] text-sm">
        Temuan is an Austroasiatic language spoken by the Temuan people, one of
        the Orang Asli groups in Peninsular Malaysia. This prototype uses
        simplified phrases for learning purposes.
      </p>
      <div className="bg-[#fff3cd] p-[10px] rounded-[5px] my-[10px] border-l-[3px] border-[#ffc107]">
        <strong className="text-[#856404] text-sm">Tip:</strong>
        <span className="text-sm ml-2">
          {" "}
          Try repeating after Nenek for better pronunciation.
        </span>
      </div>
    </div>
  );
};

export default LanguageInfo;
