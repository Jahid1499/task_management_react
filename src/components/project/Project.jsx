/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import swal from "sweetalert";
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../features/project/projectApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const Project = ({
  id,
  title,
  description,
  color,
  status,
  startDate,
  participants,
  editData,
}) => {
  const [deleteProject, { isSuccess: deleteProjectSuccess }] =
    useDeleteProjectMutation();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const [isOpen, setIsOpen] = useState(false);

  const [
    updateProject,
    {
      data,
      isLoading: addProjectLoading,
      error: responseError,
      isSuccess: updateProjectSuccess,
    },
  ] = useUpdateProjectMutation();

  const deleteHandler = (id, email) => {
    if (loggedInUser.role === "admin") {
      deleteProject(id);
    } else {
      swal("Warning", "Sorry! This project deleted by only admin!", "warning");
    }
  };

  const updateHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const modalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const submitHandler = (data) => {
    setIsOpen((prev) => !prev);
    const { title, description, color, status, startDate, participants } = data;
    updateProject({
      id,
      data: {
        title,
        participants,
        color: color.toLowerCase(),
        description,
        status,
        startDate,
      },
    });
  };

  useEffect(() => {
    if (deleteProjectSuccess) {
      swal("Success!", "Project successfully deleted!", "success");
    }
  }, [deleteProjectSuccess]);

  useEffect(() => {
    if (updateProjectSuccess) {
      swal("Success!", "Project successfully updated!", "success");
    }
  }, [updateProjectSuccess]);

  const participentCountHandler = (participants) => {
    return participants.split(",").length;
  };

  const participentHandler = (participants) => {
    return participants.split(",");
  };

  return (
    <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
      {loggedInUser.role === "admin" && (
        <>
          <button
            onClick={() => updateHandler()}
            className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          <button
            onClick={() => deleteHandler(id)}
            className="absolute top-0 right-6 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
              ></path>
            </svg>
          </button>
        </>
      )}
      <span
        className={`flex items-center capitalize h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
      >
        {title}
      </span>
      <h4 className="mt-3 text-sm font-medium capitalize">{description}</h4>

      <button
        className={`flex items-center justify-center pl-1 my-3 w-15 h-6 mr-auto rounded bg-${color}-500 text-${color}-100`}
      >
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <circle
            cx="128"
            cy="96"
            r="64"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="16"
          />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
          />
        </svg>
        <span className={`text-${color}-100 px-2`}>
          {participentCountHandler(participants)}
        </span>
      </button>

      <div>
        <ul>
          {participentHandler(participants).map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <circle
            cx="128"
            cy="96"
            r="64"
            fill="none"
            stroke="#000"
            strokeMiterlimit="10"
            strokeWidth="16"
          />
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002"
          />
        </svg>
      </div>

      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-300 fill-current absolute bottom-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 absolute bottom-5 leading-none">
            {format(new Date(startDate), "do LLL yyyy")}
          </span>
        </div>
      </div>
      <div>
        <button
          className={`absolute bottom-3 right-5 flex items-center justify-center capitalize h-6 px-3 text-xs font-semibold text-${
            status === "active" ? "green" : "red"
          }-500 bg-${status === "active" ? "green" : "red"}-100 rounded-full`}
        >
          {status}
        </button>
        {isOpen && (
          <Modal
            modalHandler={modalHandler}
            submitHandler={submitHandler}
            update={true}
            editData={editData}
          />
        )}
      </div>
    </div>
  );
};

export default Project;
