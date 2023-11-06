import { useState, useRef } from "react";

function OtpInput({handleChange,handlePaste,otp,inputsRef}) {



  return (
    <div className="flex gap-3 items-center">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="border border-[#d3d9e3] rounded-md text-center w-10 h-10 focus:outline-none bg-[#f2f4f7]"
          value={data}
          onChange={(e) => handleChange(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default OtpInput;