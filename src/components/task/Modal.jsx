import { useEffect, useState } from "react";
import {
  useGetSingleProjectQuery,
  useGetUserProjectsQuery,
} from "../../features/project/projectApi";
import { format, parseISO } from "date-fns";

const init = {
  title: "",
  status: "pending",
  description: "",
  startDate: "",
  endDate: "",
  project_id: "",
  assign: "",
};

const Modal = ({
  modalHandler,
  submitHandler,
  editData = {},
  update = false,
}) => {
  const [formData, setFormData] = useState({ ...init });
  const [error, setError] = useState({ ...init });
  const { title, description, color, status, startDate, endDate, project_id } =
    formData;
  const [assign, setAssign] = useState([]);
  const [projectId, setProjectId] = useState(-1);

  const {
    data: usersResult,
    refetch: refetchSingleProject,
    isLoading: singleProjectIsLoading,
    isError: singleProjectIsError,
  } = useGetSingleProjectQuery(projectId, { skip: projectId === -1 });

  const {
    data: userProjectData,
    isLoading,
    isError,
    error: userErro,
  } = useGetUserProjectsQuery();
  const projectList = userProjectData?.projects;
  const singleProjectParticipentList = usersResult?.users;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "project_id") {
      setProjectId(value);
    }
  };

  const updateFormData = () => {
    if (update && editData !== null) {
      const {
        title,
        description,
        status,
        startDate,
        endDate,
        project_id,
        users,
      } = editData;

      const assignString = users?.map((item) => item.id).join(",");
      setFormData({
        title,
        description,
        status,
        startDate: format(parseISO(startDate), "yyyy-MM-dd"),
        endDate: format(parseISO(endDate), "yyyy-MM-dd"),
        project_id,
        assign: assignString,
      });
      setProjectId(project_id);
      setAssign([...assignString.split(",")]);
    }
  };

  const handleChange = (e) => {};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { title, description, startDate, endDate, project_id, assign } =
      formData;
    if (title === "") {
      setError((prev) => ({
        ...prev,
        title: "Title is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        title: "",
      }));
    }

    if (description === "") {
      setError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        description: "",
      }));
    }

    if (startDate === "") {
      setError((prev) => ({
        ...prev,
        startDate: "Start Date is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        startDate: "",
      }));
    }

    if (endDate === "") {
      setError((prev) => ({
        ...prev,
        endDate: "End Date is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        endDate: "",
      }));
    }

    if (project_id === "") {
      setError((prev) => ({
        ...prev,
        project_id: "Project is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        project_id: "",
      }));
    }

    if (assign === "") {
      setError((prev) => ({
        ...prev,
        assign: "Please assign minimum one user",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        assign: "",
      }));
    }

    if (
      title !== "" &&
      description !== "" &&
      color !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      assign !== "" &&
      project_id !== 0
    ) {
      submitHandler(formData);
      setError({ ...init });
      setFormData({ ...init });
      setAssign([]);
      setProjectId(-1);
    }
  };

  const handleClose = () => {
    setFormData({ ...init });
    setError({ ...init });
    setAssign([]);
    setProjectId(-1);
    modalHandler();
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (assign.includes(value)) {
      const updateAssign = assign.filter(
        (particepent) => particepent !== value
      );
      setAssign([...updateAssign]);
    } else {
      setAssign([...assign, value]);
    }
  };

  useEffect(() => {
    const assignString = assign?.map((p) => p).join(",");
    setFormData({
      ...formData,
      assign: assignString,
    });
  }, [assign]);

  useEffect(() => {
    if (projectId !== -1) {
      refetchSingleProject();
    }
  }, [projectId, refetchSingleProject]);

  useEffect(() => {
    updateFormData();
  }, []);
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
              onClick={modalHandler}
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
                Task form
              </h3>
              <form className="space-y-6" onSubmit={onSubmitHandler}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => onChangeHandler(e)}
                    value={title}
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Please enter team name"
                  />
                  {error?.title && (
                    <label className="text-xs text-red-400">
                      {error?.title}
                    </label>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    onChange={(e) => onChangeHandler(e)}
                    value={description}
                    placeholder="Please write task description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  ></textarea>
                  {error?.description && (
                    <label className="text-xs text-red-400">
                      {error?.description}
                    </label>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="projectId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Chose project
                  </label>
                  <select
                    onChange={(e) => onChangeHandler(e)}
                    disabled={update}
                    id="projectId"
                    name="project_id"
                    value={project_id}
                    className="bg-gray-50 border focus:border-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled value="">
                      Select one
                    </option>
                    {projectList &&
                      projectList.length > 0 &&
                      projectList.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                  </select>
                  {error?.assign && (
                    <label className="text-xs text-red-400">
                      {error?.assign}
                    </label>
                  )}

                  {projectList?.length === 0 && (
                    <label className="text-xs text-red-400">
                      Project not found
                    </label>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assign"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Chose particepent
                  </label>
                  <select
                    value={assign}
                    multiple
                    onClick={(e) => handleSelect(e)}
                    onChange={(e) => handleChange(e)}
                    id="assign"
                    className="bg-gray-50 border focus:border-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled value="">
                      Select one
                    </option>
                    {singleProjectParticipentList &&
                      singleProjectParticipentList.length > 0 &&
                      singleProjectParticipentList.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                  {error?.participants && (
                    <label className="text-xs text-red-400">
                      {error?.participants}
                    </label>
                  )}
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
                        checked={status === "pending"}
                        onChange={(e) => onChangeHandler(e)}
                        className="mr-1 text-blue-500"
                      />
                      Pending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="ongoing"
                        checked={status === "ongoing"}
                        onChange={(e) => onChangeHandler(e)}
                        className="mr-1 text-red-500"
                      />
                      Ongoing
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="done"
                        checked={status === "done"}
                        onChange={(e) => onChangeHandler(e)}
                        className="mr-1 text-blue-500"
                      />
                      Done
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Start date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={(e) => onChangeHandler(e)}
                    value={startDate}
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Please select a start date"
                  />
                  {error?.startDate && (
                    <label className="text-xs text-red-400">
                      {error?.startDate}
                    </label>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Start date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={(e) => onChangeHandler(e)}
                    value={endDate}
                    id="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Please select a start date"
                  />
                  {error?.endDate && (
                    <label className="text-xs text-red-400">
                      {error?.endDate}
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {update ? "Update " : "Submit "} form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
