import { Link } from "react-router-dom";
// import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import MainContent from "./MainContent";

function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <MainContent />

      <div className="flex justify-center items-center p-18">
        <Link to="/contribute">
          <span className="text-sm tracking-wide text-gray-500 hover:text-white">Contribute</span>
        </Link>
      </div>
    </div>
  );
}

// function Learn() {
//   return (
//     <section>
//       <div className="flex gap-3 mb-4">
//         <input
//           className="px-3 py-2 rounded-lg border border-white/20 bg-transparent"
//           placeholder="Search for word..."
//         />
//       </div>
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {["Nature", "Family", "Daily Life"].map((c) => (
//           <button
//             key={c}
//             className="px-3 py-2 rounded-full border border-white/20 bg-transparent"
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       <div className="grid gap-3">
//         <WordCard word="air" translation="water" example="Saya minum air." />
//       </div>
//     </section>
//   );
// }

// function Contribute() {
//   return (
//     <section>
//       <h2 className="text-xl font-semibold mb-4">Add a new word</h2>
//       <form
//         className="grid gap-3 max-w-[520px]"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <label className="grid gap-1">
//           <span>Word</span>
//           <input
//             className="px-3 py-2 rounded-lg border border-white/20 bg-transparent"
//             name="word"
//             required
//           />
//         </label>
//         <label className="grid gap-1">
//           <span>Translation</span>
//           <input
//             className="px-3 py-2 rounded-lg border border-white/20 bg-transparent"
//             name="translation"
//             required
//           />
//         </label>
//         <label className="grid gap-1">
//           <span>Audio</span>
//           <input
//             className="px-3 py-2 rounded-lg border border-white/20 bg-transparent"
//             type="file"
//             accept="audio/*"
//           />
//         </label>
//         <button
//           className="px-4 py-2 rounded-lg border border-transparent bg-[#646cff] text-white"
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>
//     </section>
//   );
// }

// function Chatbot() {
//   return (
//     <section>
//       <div className="grid gap-3">
//         <div className="px-3 py-2 rounded-xl bg-[rgba(100,108,255,0.15)] justify-self-end max-w-[520px]">
//           Teach me how to say hello
//         </div>
//         <div className="px-3 py-2 rounded-xl bg-white/5 justify-self-start max-w-[520px]">
//           In Semai, hello is <strong>...</strong>
//           <div>
//             <button className="px-4 py-2 rounded-lg border border-white/20">
//               ▶ Play
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// type WordCardProps = { word: string; translation: string; example?: string };
// function WordCard({ word, translation, example }: WordCardProps) {
//   return (
//     <div className="border border-white/10 rounded-xl p-4 grid gap-2">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-[20px] font-bold">{word}</div>
//           <div className="opacity-90">{translation}</div>
//         </div>
//         <button className="px-4 py-2 rounded-lg border border-white/20">
//           ▶ Play
//         </button>
//       </div>
//       {example ? <div className="opacity-80 italic">{example}</div> : null}
//     </div>
//   );
// }

export default Home;
