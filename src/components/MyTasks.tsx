import { useState, useEffect } from "react";
import axios from "axios";
import { useTodoContext } from "components/GrandLayout";
import Task from "components/Task";
import ReactPaginate from "react-paginate";
import prevIcon from "assets/prevIcon.svg";
import nextIcon from "assets/nextIcon.svg";
import "styles/MyTasks.css";

const MyTasks = () => {
  const { todos, setTodos, renderCustomDates, renderCurrentMonthAndYear } =
    useTodoContext();
  const [offset, setOffset] = useState(0);
  const endOffset = offset + 10;

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * 10) % todos.length;
    setOffset(newOffset);
  };

  const pageCount = Math.ceil(todos.length / 10);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });
  }, [setTodos]);

  return (
    <div className="pb-[70px] md:overflow-y-scroll xs:overflow-y-visible xs:overflow-x-hidden md:overflow-x-visible  ">
      {renderCurrentMonthAndYear()}
      {renderCustomDates()}
      <h1 className="font-workSans font-semibold mt-4 mb-[12px] ">My Tasks</h1>
      {todos.slice(offset, endOffset).map((todo, index) => {
        return <Task todo={todo} key={index} />;
      })}
      <div className="mb-6">
        <ReactPaginate
          previousLabel={
            <span className="flex">
              <img src={prevIcon} alt="previous" className="mr-2" />
              <p>Previous</p>
            </span>
          }
          nextLabel={
            <span className="flex">
              <p>Next</p>
              <img src={nextIcon} alt="next" className="ml-2" />
            </span>
          }
          breakLabel="..."
          pageCount={pageCount}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          containerClassName={"pagenationContainer"}
          previousClassName={"pagenationPreviousList"}
          nextClassName={"pagenationPreviousList"}
          previousLinkClassName={"pagenationPreviousLink"}
          nextLinkClassName={"pagenationPreviousLink"}
          breakClassName={"pagenationPageList"}
          breakLinkClassName={"pagenationPageLink"}
          activeClassName={"pagenationActive"}
          pageClassName={"pagenationPageList"}
          pageLinkClassName={"pagenationPageLink"}
          disabledClassName={"pagenationDisabled"}
        />
      </div>
    </div>
  );
};

export default MyTasks;
