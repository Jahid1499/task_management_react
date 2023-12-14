import { useSelector } from "react-redux";
import Template from "../templete/Template";
import {
  useAddTaskMutation,
  useGetTasksQuery,
} from "../../features/task/taskApi";
import Error from "../ui/Error";
import Task from "./Task";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import swal from "sweetalert";

const Tasks = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetTasksQuery() || {};
  const [
    addTask,
    { data, isLoading: addTaskLoading, error: responseError, isSuccess },
  ] = useAddTaskMutation() || {};

  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen((prev) => !prev);
  };
  const submitHandler = (data) => {
    setIsOpen((prev) => !prev);
    const {
      assign,
      description,
      endDate,
      project_id,
      startDate,
      status,
      title,
    } = data;

    addTask({
      assign,
      description,
      endDate,
      project_id,
      startDate,
      status,
      title,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      swal("Success!", "Task successfully added!", "success");
    }
  }, [isSuccess]);

  const tasks = responseData?.tasks;
  let content = null;
  if (isLoading) {
    content = <div className="m-2 text-center">Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Sorry!</strong>
        <span className="block sm:inline"> No task found.</span>
      </div>
    );
  } else if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks.map((task) => (
      <Task key={task.id} {...task} editData={task} />
    ));
  }
  return (
    <>
      <Template>
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button
            onClick={modalHandler}
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>

        {!isOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
            {content}
          </div>
        )}

        {isOpen && (
          <Modal modalHandler={modalHandler} submitHandler={submitHandler} />
        )}
      </Template>
    </>
  );
};

export default Tasks;
