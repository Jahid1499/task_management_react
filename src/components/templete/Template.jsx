import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import logoImage from "./../../assets/images/logo.png";
import { apiSlice } from "../../features/api/apislice";
import logo from "../../assets/images/logo.png";

const Template = ({ children, searchOption = false }) => {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    // dispatch(searched(value));
  };

  const handleSearch = debounceHandler(doSearch, 500);

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
          <Link to="/tasks">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Learn with sumit"
            />
          </Link>

          {searchOption && (
            <input
              className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
              type="search"
              placeholder="Search for anything…"
              onChange={(e) => handleSearch(e.target.value)}
            />
          )}

          <div className="ml-10">
            <NavLink
              className={`mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700 ${
                splitLocation[1] === "tasks" ? "text-indigo-700" : ""
              }`}
              to="/tasks"
            >
              Tasks
            </NavLink>
            <NavLink
              className={`mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700 ${
                splitLocation[1] === "projects" ? "text-indigo-700" : ""
              }`}
              to="/projects"
            >
              Project
            </NavLink>
          </div>

          <button className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
            <img src={user.avatar} alt="" />
          </button>
          <span className="mx-3">{user.name}</span>
          <button onClick={logout}>
            <span className="flex items-center mx-4 h-6 px-6 py-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
              Logout
            </span>
          </button>
        </div>

        {children}

        <a
          className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
          href="http://www.apexdmit.com"
          rel="noreferrer"
          target="_blank"
        >
          <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
            <img src={logoImage} alt="LWS Logo" />
          </div>
          <span className="ml-1 text-sm leading-none">APEX DMIT LT.</span>
        </a>
      </div>
    </>
  );
};

export default Template;
