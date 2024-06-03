import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Logo from "/logo4.jpeg";
const NavBar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-primary hover:underline transition duration-300"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allClasses"
          className="hover:text-primary hover:underline transition duration-300"
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teachOnEduManage"
          className="hover:text-primary hover:underline transition duration-300"
        >
          Teach On Edu Manage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className="hover:text-primary hover:underline transition duration-300"
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 fixed h-20 z-[999] max-w-screen-xl mx-auto opacity-90 border-b-2 border-orange-400 rounded-b-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content gap-2 uppercase mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <div className="w-10 h-10">
          <img src={Logo} alt="logo" className="rounded-xl" />
        </div>
      </div>
      <div className="navbar-center  hidden md:flex">
        <ul className="menu menu-horizontal space-x-2 px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item text-secondary">
                O
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">0 Items</span>
              <span className="text-info">Subtotal: 0</span>
              <div className="card-actions">
                <Link
                  to="/dashboard/cart"
                  className="btn btn-primary btn-block"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar online w-10 h-10 "
                >
                  <img
                    tabIndex={0}
                    className="rounded-full"
                    src={user?.photoURL}
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box opacity-100 space-y-2 w-52"
                >
                  <p className="text-center">{user?.displayName}</p>
                  <li></li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="btn btn-outline text-secondary btn-sm"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="btn btn-primary text-secondary btn-sm"
                    >
                      LOGOUT
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "flex btn text-pink-600 border border-primary btn-sm"
                  : "font-bold btn btn-outline  transition-all duration-300 btn-sm"
              }
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
