import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Task = ({ todo }: any) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const trucateTodoTitle = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };

  useEffect(() => {
    console.log("checkbox checked is", isChecked);
  }, [isChecked]);

  return (
    <div
      key={todo?.id}
      className="hover:bg-[#EAEDFE] bg-[#F9FAFB] mt-2 h-[72px] w-full flex items-center justify-between px-4 font-workSans text-[14px] cursor-pointer "
    >
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="rounded-[6px] mr-4 accent-[#3F5BF6] cursor-pointer "
        />
        <div
          className=""
          onClick={() =>
            navigate("/view-task", { state: { id: todo?.id, todo: todo } })
          }
        >
          <p
            className={
              isChecked
                ? "font-[500] xs:block md:hidden cancledText text-[#D0D5DD]"
                : "font-[500] xs:block md:hidden "
            }
          >
            {trucateTodoTitle(todo?.title, 20)}
          </p>
          <p
            className={
              isChecked
                ? "font-[500] md:block xs:hidden line-through text-[#D0D5DD] "
                : "font-[500] md:block xs:hidden "
            }
          >
            {todo?.title}
          </p>
          <p className={isChecked ? " line-through text-[#D0D5DD] " : " "}>
            10:30am - 11:30am
          </p>
        </div>
      </div>
      <div>
        <p>{todo?.todoDate === undefined ? "Today" : todo?.todoDate}</p>
      </div>
    </div>
  );
};

export default Task;
