import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTodoContext } from "components/GrandLayout";
import closeIcon from "assets/closeIcon.svg";
import blueCalendarIcon from "assets/blueCalendarIcon.svg";
import blueTimeIcon from "assets/blueTimeIcon.svg";

const ViewTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { todos, setTodos } = useTodoContext();

  const handleDelete = (todoId: number) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error("Error deleting todo:", error);
      });
  };

  const MainLayout = () => {
    return (
      <div>
        <button onClick={() => navigate("/")}>
          <img
            src={closeIcon}
            alt="close"
            className="absolute top-4 right-4 w-[10px] h-[10px] "
          />
        </button>
        <h1 className=" font-[500] mt-4 ">{location.state.todo?.title}</h1>
        <section className="mt-4">
          <span className="flex items-center ">
            <img
              src={blueCalendarIcon}
              alt="calendar"
              className="w-[15px] h-[15px] mr-2"
            />
            <p className="text-[14px] font-[500] ">
              {location.state.todo?.todoDate === undefined
                ? "Today"
                : location.state.todo?.todoDate}
            </p>
          </span>
          <span className="flex items-center">
            <img
              src={blueTimeIcon}
              alt="time"
              className="w-[15px] h-[15px] mr-2 "
            />
            <p className="text-[14px] font-[500] ">10:30am - 11:30am</p>
          </span>
        </section>
        <section className="flex items-center justify-between w-full font-workSans font-semibold mt-5">
          <button
            className="w-[145px] h-[40px] border-[1px] rounded-[8px] border-[#D0D5DD] text-[#344054] text-[14px] "
            onClick={() => handleDelete(location.state.id)}
          >
            Delete
          </button>
          <button
            className="w-[145px] h-[40px] border-[1px] rounded-[8px] border-[#D0D5DD] bg-[#3F5BF6] text-white text-[14px] "
            onClick={() =>
              navigate("/edit-task", {
                state: {
                  id: location.state.todo?.id,
                  todo: location.state.todo,
                },
              })
            }
          >
            Edit
          </button>
        </section>
      </div>
    );
  };

  return (
    <main>
      {
        <div className="xs:hidden lg:block">
          <div className="w-full rounded-[8px] max-h-[256px] border-[1px] shadow-lg mt-4 p-4 font-workSans relative ">
            {MainLayout()}
          </div>
        </div>
      }
      {/* MOBILE SCREEN */}
      {
        <div className="xs:block lg:hidden relative  ">
          <div className="w-full justify-end items-end  flex fixed inset-0 bg-transparent bg-opacity-100 z-50 ">
            <div className="p-8  w-screen h-[80vh] border-0 rounded-lg shadow-lg flex flex-col rounded-t-[32px] bg-white outline-none focus:outline-none">
              {MainLayout()}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </div>
      }
    </main>
  );
};

export default ViewTask;
