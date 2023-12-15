import { useEffect, useState } from "react";
import {
  useGetSingleProjectQuery,
  useGetUserProjectsQuery,
} from "../../features/project/projectApi";
import { format, parseISO } from "date-fns";

const UpdateModal = ({
  submitHandler,
  updateModalHandler,
  status,
  title,
  description,
}) => {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setUpdateStatus(value);
  };

  useEffect(() => {
    setUpdateStatus(status);
  }, [status]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (status === updateStatus) {
      setError("Status must be change");
    } else {
      submitHandler(updateStatus);
      setError(null);
      setUpdateStatus([]);
    }
  };

  const handleClose = () => {
    setUpdateStatus([]);
    setError(null);
    updateModalHandler();
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 overflow-y-auto overflow-x-hidden w-full"
      >
        <div className="relative p-4 w-full max-w-md h-full mx-auto my-auto pt-20">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span onClick={handleClose} className="sr-only">
                Close modal
              </span>
            </button>

            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Task status update form
              </h3>
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                <div>
                  {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label> */}
                  <b>Title </b>
                  <h4>{title}</h4>
                </div>

                <div>
                  <b>Description </b>
                  <p>{description}</p>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Status <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="pending"
                        checked={updateStatus === "pending"}
                        onChange={onChangeHandler}
                        className="mr-1 text-blue-500"
                      />
                      Pending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="ongoing"
                        checked={updateStatus === "ongoing"}
                        onChange={onChangeHandler}
                        className="mr-1 text-red-500"
                      />
                      Ongoing
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="done"
                        checked={updateStatus === "done"}
                        onChange={onChangeHandler}
                        className="mr-1 text-blue-500"
                      />
                      Done
                    </label>
                  </div>
                </div>

                {error && (
                  <label className="text-xs text-red-400">{error}</label>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Status
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
