import React from "react";

const SingleDate = ({ handleDateClick, index, date }: any) => {
  return (
    <div
      key={index}
      onClick={() => handleDateClick(date)}
      className="cursor-pointer xs:w-[50px] md:w-[62px] xs:[54px] md:h-[68px] rounded-[8px] border-[1px] hover:bg-[#3F5BF6] hover:text-white border-[#D0D5DD] flex items-center justify-center flex-col mt-4 xs:text-[12px] md:text-[14px] "
    >
      <p className="flex flex-col items-center justify-center font-workSans font-semibold  ">
        {date.toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </p>
      <p className="flex flex-col items-center justify-center font-workSans font-semibold ">
        {date.toLocaleDateString("en-US", {
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default SingleDate;
