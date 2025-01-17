import React from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
  const { closePrompt, doNotShowAgain } = props;
  const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-4 text-white flex flex-col items-center justify-around">
      <div className="relative bg-primary p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
        <button className="absolute top-0 right-0 p-3" onClick={closePrompt}>
          <FaTimes className="text-2xl" />
        </button>
        <p className="text-lg">Precisamos intalar o App antes de prosseguir!</p>
        <div className="flex flex-col gap-4 items-center text-lg">
          <p>
            Infelizmente, não conseguimos detectar que navegador você está
            usando. Favor utlizar o Chrome, Safari ou Firefox
          </p>
          {/* <Link className="text-blue-300" href={searchUrl} target='_blank'>Try This Search</Link> */}
        </div>
        <button className="border-2 p-1" onClick={doNotShowAgain}>
          Clique aqui se já tiver instalado
        </button>
      </div>
    </div>
  );
}
