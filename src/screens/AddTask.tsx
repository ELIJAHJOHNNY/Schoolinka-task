import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import closeIcon from "assets/closeIcon.svg";
import calendarIcon from "assets/calendarIcon.svg";
import timeIcon from "assets/timeIcon.svg";
import notifyMe from "assets/notifyMe.svg";
import CustomCalendar from "components/CustomCalendar";
import { useTodoContext } from "components/GrandLayout";
import { formatDateToCurrent } from "components/FormatDateToCurrent";

const AddTask = () => {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState("");
  const { todos, setTodos, selectedDate } = useTodoContext();

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    const newTodoItem = {
      userId: 1,
      id: todos.length + 1,
      title: newTodo,
      completed: false,
      todoDate:
        selectedDate !== null
          ? formatDateToCurrent(selectedDate)
          : formatDateToCurrent(new Date()),
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTodoItem)
      .then(response => {
        setNewTodo("");
        setTodos([response.data, ...todos]);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error adding todo:", error);
        setNewTodo("");
      });
  };

  const MainLayout = () => {
    return (
      <div>
        <section className="flex items-center justify-between w-full">
          <p className="font-[500] ">Add Task</p>
          <button onClick={() => navigate("/")}>
            <img src={closeIcon} alt="close" />
          </button>
        </section>
        <textarea
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          className="w-full h-[140px] rounded-[8px] outline-none border-[1px] border-[#D0D5DD] bg-[#F9FAFB] p-2 text-[14px] mt-4 "
        />
        <section className="mt-2 flex items-center justify-between w-full relative">
          <div className="flex items-center justify-center w-[30%]">
            <button
              className="rounded-[8px] border-[#D0D5DD] border-[1px] w-[90px] h-[40px] flex items-center justify-center "
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <img src={calendarIcon} alt="calendar" className="mr-2" />
              <p className="text-[14px] font-semibold text-[#667085] ">Today</p>
            </button>
          </div>
          <div className="flex items-center justify-between w-[62%] ">
            <button className="rounded-[8px] border-[#D0D5DD] border-[1px] w-[90px] h-[40px]  flex items-center justify-center">
              <img src={timeIcon} alt="calendar" className="mr-2" />
              <p className="text-[14px] font-semibold text-[#667085] ">00:00</p>
            </button>
            <button className="rounded-[8px] border-[#D0D5DD] border-[1px] w-[90px] h-[40px]  flex items-center justify-center">
              <img src={timeIcon} alt="calendar" className="mr-2" />
              <p className="text-[14px] font-semibold text-[#667085] ">00:00</p>
            </button>
          </div>
          <div className="absolute top-[48px] right-[-12px] pb-[32px] backdrop-blur-[1px]  ">
            {showCalendar && <CustomCalendar />}
          </div>
        </section>
        <section className="mt-2 flex items-center justify-between w-full">
          <div className="flex items-center justify-center">
            <img src={notifyMe} alt="notify" className="mr-2" />
            <p className="text-[#667085] font-inter ">10 minutes before</p>
          </div>
          <div>
            <button>
              <img src={closeIcon} alt="close" className="w-[10px] h-[10px] " />
            </button>
          </div>
        </section>
        <section className="flex items-center justify-between w-full font-workSans font-semibold mt-4 mb-1">
          <button
            className="w-[145px] h-[40px] border-[1px] rounded-[8px] border-[#D0D5DD] text-[#344054] "
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            className="w-[145px] h-[40px] border-[1px] rounded-[8px] border-[#D0D5DD] bg-[#3F5BF6] text-white text-[14px] "
            onClick={handleAddTodo}
            disabled={newTodo === ""}
          >
            Add
          </button>
        </section>
      </div>
    );
  };

  return (
    <div className="relative ">
      {
        <div className="xs:hidden lg:block  ">
          <main className="w-full min-h-[300px] border-[1px] border-t-0 shadow-lg mt-4 pb-[32px] p-4 font-workSans ">
            {MainLayout()}
          </main>
        </div>
      }

      {/* MOBILE SCREEN */}
      {
        <div className="xs:block lg:hidden font-workSans ">
          <div className="w-full justify-end items-end  flex fixed inset-0 bg-transparent bg-opacity-100 z-50">
            <div className="p-8 items-center justify-center w-screen min-h-[373px] overflow-y-scroll border-0 rounded-lg shadow-lg flex flex-col rounded-t-[32px] bg-white outline-none focus:outline-none">
              {MainLayout()}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </div>
      }
    </div>
  );
};

export default AddTask;
