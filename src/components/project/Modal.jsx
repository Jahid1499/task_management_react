import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../features/users/usersApi";
import { format, parseISO } from "date-fns";
const init = {
  title: "",
  description: "",
  color: "",
  status: "active",
  startDate: "",
  participants: "",
};

const Modal = ({
  modalHandler,
  submitHandler,
  editData = {},
  update = false,
}) => {
  const [formData, setFormData] = useState({ ...init });
  const [error, setError] = useState({ ...init });
  const { title, description, color, status, startDate } = formData;
  const [participants, setParticepents] = useState([]);

  const {
    data: userData,
    isLoading,
    isError,
    error: userErro,
  } = useGetUserQuery();

  const updateFormData = () => {
    if (update && editData !== null) {
      const { title, description, color, status, startDate, participants } =
        editData;
      setFormData({
        title: title,
        description,
        color,
        status,
        startDate: format(parseISO(startDate), "yyyy-MM-dd"),
        participants,
      });
      setParticepents([...participants.split(",")]);
    }
  };
  const userList = userData?.users;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange = (e) => {};

  useEffect(() => {
    const particepentString = participants.map((p) => p).join(",");
    setFormData({
      ...formData,
      participants: particepentString,
    });
  }, [participants]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { title, description, startDate, participants } = formData;
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

    if (color === "") {
      setError((prev) => ({
        ...prev,
        color: "Color is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        color: "",
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

    if (participants === "") {
      setError((prev) => ({
        ...prev,
        participants: "Particepant is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        participants: "",
      }));
    }

    if (
      title !== "" &&
      description !== "" &&
      color !== "" &&
      startDate !== "" &&
      participants.length !== 0
    ) {
      submitHandler(formData);
      setError({ ...init });
      setParticepents([]);
      setFormData({ ...init });
    }
  };

  const handleClose = () => {
    setFormData({ ...init });
    setError({ ...init });
    setParticepents([]);
    modalHandler();
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (participants.includes(value)) {
      const updateParticepentsr = participants.filter(
        (particepent) => particepent !== value
      );
      setParticepents([...updateParticepentsr]);
    } else {
      setParticepents([...participants, value]);
    }
  };
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
                Project form
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:textDescription -gray-300"
                  >
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    onChange={(e) => onChangeHandler(e)}
                    value={description}
                    name="description"
                    placeholder="Please write project description"
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
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Color <span className="text-red-400">*</span>{" "}
                    <span className="text-gray-400 text-xs">
                      (Ex: yellow, lime, green, emerald, teal, sky, blue,
                      indigo, violet, purple, fuchsia, rose)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    onChange={(e) => onChangeHandler(e)}
                    value={color}
                    id="color"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Please enter color name"
                  />
                  {error?.color && (
                    <label className="text-xs text-red-400">
                      {error?.color}
                    </label>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="participants"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Chose user
                  </label>
                  <select
                    value={participants}
                    multiple
                    onClick={(e) => handleSelect(e)}
                    onChange={(e) => handleChange(e)}
                    id="participants"
                    className="bg-gray-50 border focus:border-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled value="">
                      Select one
                    </option>
                    {userList &&
                      userList.length > 0 &&
                      userList.map((user) => (
                        <option
                          key={user.id}
                          // selected={participants.includes(user.email)}
                          value={user.email}
                        >
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
                        value="active"
                        checked={status === "active"}
                        onChange={(e) => onChangeHandler(e)}
                        className="mr-1 text-blue-500"
                      />
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={status === "inactive"}
                        onChange={(e) => onChangeHandler(e)}
                        className="mr-1 text-red-500"
                      />
                      Inactive
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
