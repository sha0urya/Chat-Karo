import React from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
function Header() {
  const router = useRouter();


   const handleGoBack = () => {
     router.push("/");
   };

  return (
    <div className="flex text-center justify-between mx-1 rounded-s-lg rounded-r-lg my-0 bg-brand-primary">
      <div>
        <button
          onClick={handleGoBack}
          className="flex items-center mt-2 justify-between ml-2  border-solid border-b-4 border-t-2 border-r-2 border-red-400 rounded-lg text-lg text-white py-3 px-5 transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
          data-tooltip-id="goBackTooltip"
          aria-label="Go Back"
        >
          <FaArrowLeft className="mr-4 text-2xl" />
          <div className="flex text-2xl">Back</div>
        </button>
        <Tooltip
          id="goBackTooltip"
          content="Go Back to Chat"
          place="top"
          className="tooltip-custom"
        />
      </div>
        <h1 className="text-5xl font-serif text-gray-100 items-center inline-flex mx-1 font-bold mb-1 animate-pulse">
          Chat-Karo Weather
          <Image
            src="https://openweathermap.org/img/wn/04n.png"
            width={80}
            height={40}
          ></Image>
        </h1>
      <div></div>
    </div>
  );
}

export default Header;
