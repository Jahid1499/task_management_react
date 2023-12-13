import Template from "../templete/Template";

const Tasks = () => {
  return (
    <>
      <Template>
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"></div>
      </Template>
    </>
  );
};

export default Tasks;
