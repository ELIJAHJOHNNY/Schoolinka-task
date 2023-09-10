import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "assets/plusIcon.svg";
import speakIcon from "assets/speakIcon.svg";
import MyTasks from "components/MyTasks";
import Header from "components/Header";
import SingleDate from "components/SingleDate";
import { TodoType } from "types/TodoTypes";

type Props = {
  children: React.ReactNode;
};

const TodoContext = createContext<
  | {
      selectedDate: Date | null;
      setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
      customDates: Date[];
      setCustomDates: React.Dispatch<React.SetStateAction<Date[]>>;
      handleMonthChange: (date: Date) => void;
      renderCustomDates: () => JSX.Element;
      renderCurrentMonthAndYear: () => JSX.Element;
      todos: TodoType[];
      setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
      handleDateClick: (date: Date) => void;
    }
  | undefined
>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};

const GrandLayout: React.FC<Props> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [customDates, setCustomDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [todos, setTodos] = useState<TodoType[]>([]);
  const navigate = useNavigate();

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleMonthChange = (date: Date) => {
    const firstDayOfNewMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const newCustomDates: Date[] = [];
    for (let i = 0; i < 10; i++) {
      const newDate = new Date(firstDayOfNewMonth);
      newDate.setDate(i + 1);
      newCustomDates.push(newDate);
    }
    setCustomDates(newCustomDates);
    setCurrentMonth(date);
    setSelectedDate(date);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCustomDates = () => {
    return (
      <div className="flex gap-4 xs:mt-0 lg:mt-4 overflow-x-scroll whitespace-nowrap scroll-smooth    ">
        {customDates.map((date: Date, index: number) => {
          return (
            <div key={index}>
              <SingleDate
                date={date}
                handleDateClick={handleDateClick}
                index={index}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderCurrentMonthAndYear = () => {
    return (
      <div className="font-workSans font-semibold">
        {currentMonth.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </div>
    );
  };

  const setAllDaysOfCurrentMonth = () => {
    const firstDayOfCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfCurrentMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const newCustomDates: Date[] = [];

    for (
      let date = new Date(firstDayOfCurrentMonth);
      date <= lastDayOfCurrentMonth;
      date.setDate(date.getDate() + 1)
    ) {
      newCustomDates.push(new Date(date));
    }

    setCustomDates(newCustomDates);
  };

  useEffect(() => {
    setAllDaysOfCurrentMonth();
  }, [currentMonth]);

  const contextValues = {
    selectedDate,
    setSelectedDate,
    customDates,
    setCustomDates,
    handleMonthChange,
    renderCustomDates,
    renderCurrentMonthAndYear,
    todos,
    setTodos,
    handleDateClick,
  };

  return (
    <div>
      <Header />
      <div className="mt-[100px] lg:px-[56px] xs:px-[24px] overflow-y-hidden relative ">
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="font-workSans text-[24px] font-[700] ">
              {getGreeting()}!
            </h1>
            <p className="text-[#475467] text-[14px] font-workSans">
              You got some task to do.
            </p>
          </div>

          <button
            className="xs:hidden bg-[#3F5BF6] rounded-[8px] text-[14px] w-[156px] h-[40px] text-white lg:flex items-center justify-evenly font-[700]  font-workSans "
            onClick={() => navigate("/add-task")}
          >
            <span>
              <img src={plusIcon} alt="plus icon" />
            </span>
            Create New Task
          </button>
        </div>
        {/* overflow-y-scroll */}
        <div className="flex justify-between w-full xs:max-h-[550px] md:max-h-[700px] lg:max-h-[550px] mt-2 overflow-y-scroll scrollbar-hide ">
          <TodoContext.Provider value={contextValues}>
            <div className="lg:w-[60] xl:w-[71%] xs:w-full mt-4  lg:overflow-y-scroll">
              <MyTasks />
            </div>
            <hr className="bg-[#EAECF0] w-[1px] h-full mt-4 xs:hidden lg:block " />
            <div className="lg:w-[37%] xl:w-[26%] ">{children}</div>
          </TodoContext.Provider>
        </div>
        <div className="fixed bottom-0 right-0 w-full mb-[24px] flex items-center justify-center  ">
          <div className="relative " onClick={() => navigate("/add-task")}>
            <input
              readOnly
              className=" cursor-pointer font-[500] font-workSans lg:hidden outline-none border-[#F9FAFB] w-[300px] h-[40px] rounded-[8px] bg-[#D0D5DD] z-[30] p-4  "
              placeholder="Input task"
            />
            <img
              src={speakIcon}
              alt="speak"
              className="absolute top-2 right-4 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrandLayout;
