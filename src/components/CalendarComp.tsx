import React from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useTodoContext } from "./GrandLayout";

const CalendarComp = () => {
  const { selectedDate, handleMonthChange, handleDateClick } = useTodoContext();
  // const targetDivRef = useRef<any>(null);
  console.log(
    "selected date is",
    selectedDate?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  // useEffect(() => {
  //   const inputElement = document.createElement("input");
  //   inputElement.setAttribute("type", "text");
  //   inputElement.setAttribute("placeholder", "Enter text here");

  //   // Find the target div by its class name using the ref
  //   const targetDiv = targetDivRef.current;

  //   // Insert the input element above the target div
  //   targetDiv?.parentNode.insertBefore(inputElement, targetDiv);
  // }, []);

  return (
    <div className="">
      <input
        className="outline-none border-[1px] rounded-[8px] border-[#999999] p-2 h-[40px] w-[200px] font-workSans text-[14px] "
        readOnly
        value={
          selectedDate !== null
            ? selectedDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : format(new Date(), "MMM dd, yyyy")
        }
      />
      <Calendar
        // ref={targetDivRef}
        onChange={handleDateClick}
        onShownDateChange={handleMonthChange}
        className="border-[#999999] shadow-lg border-[1px] rounded-[8px] font-workSans  "
        color="#3F5BF6"
        rangeColors={["#3F5BF6"]}
        showMonthAndYearPickers={false}
      />
    </div>
  );
};

export default CalendarComp;
