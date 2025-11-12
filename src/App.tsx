import { useState } from "react";

import FamilyCreator from "./Tabs/Familycreator";
import Applcalc from "./Tabs/Applcalc";

function App() {
  const [selec, setSelec] = useState("Apple-Calc");

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 text-zinc-100">
      <div className="w-full max-w-xl bg-[#18181b] border border-[#2a2a2e] rounded-2xl shadow-lg p-6 space-y-5 transition-all">
        <div className="relative right-0 p-4">
        {/* Tabs */}
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-[#1f1f23] border border-[#333]"
          data-tabs="tabs"
          role="tablist"
        >
          <li className="z-30 flex-auto text-center">
            <a
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                selec === 'Apple-Calc' 
                  ? 'text-white bg-indigo-500 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-300 bg-transparent'
              }`}
              aria-selected={selec === 'Apple-Calc'}
              onClick={() => setSelec('Apple-Calc')}
            >
              Apple-Calc
            </a>
          </li>
          <li className="z-30 flex-auto text-center">
            <a
              className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                selec === 'FamilyCreator' 
                  ? 'text-white bg-indigo-500 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-300 bg-transparent'
              }`}
              aria-selected={selec === 'FamilyCreator'}
              onClick={() => setSelec('FamilyCreator')}
            >
              FamilyCreator
            </a>
          </li>
        </ul>
        </div>
        {selec == "Apple-Calc" && <Applcalc />}
        {selec == "FamilyCreator" && <FamilyCreator />}
      </div>
    </div>
  );
}

export default App;
