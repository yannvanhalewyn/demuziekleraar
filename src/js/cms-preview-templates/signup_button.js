import React from "react";

export default ({className}) => {
  return (
    <button className={`btn group ${className}`}>
      <div className="flex items-center">
        <div className="group-hover:animation-spin group-hover:animation-duration-100 group-hover:animation-1">

          <svg className="w-5 h-5 group-hover:animation-grow group-hover:animation-duration-1000 group-hover:animation-1 fill-current text-white" viewBox="0 0 24 24">
            <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"/>
          </svg>

        </div>
        <span className="ml-2">
          Meld je aan
        </span>
      </div>
    </button>
  );
}
