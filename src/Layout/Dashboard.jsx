import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaCartArrowDown,
  FaList,
  FaRectangleList,
  FaUtensils,
  FaUsers,
  FaBook,
} from "react-icons/fa6";
import { FaHome, FaShopify } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { GiWallet } from "react-icons/gi";
import { MdRateReview, MdContentPasteSearch } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const { cart } = useCart();
  const { isAdmin } = useAdmin();
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-64 bg-orange-400 font-cinzel font-semibold text-white md:sticky md:top-0">
        <ul className="menu space-y-3 p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className="flex items-center space-x-2"
                >
                  <FaHome />
                  <span>Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className="flex items-center space-x-2"
                >
                  <FaUtensils />
                  <span>Add Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageItems"
                  className="flex items-center space-x-2"
                >
                  <FaList />
                  <span>Manage Items</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageBookings"
                  className="flex items-center space-x-2"
                >
                  <FaBook />
                  <span>Manage Bookings</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className="flex items-center space-x-2"
                >
                  <FaUsers />
                  <span>All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className="flex items-center space-x-2"
                >
                  <FaHome />
                  <span>User Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reservation"
                  className="flex items-center space-x-2"
                >
                  <FcCalendar />
                  <span>Reservation</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center space-x-2"
                >
                  <GiWallet />
                  <span>Payment History</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className="flex items-center space-x-2"
                >
                  <FaCartArrowDown />
                  <span>My Cart ({cart.length})</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addReviews"
                  className="flex items-center space-x-2"
                >
                  <MdRateReview />
                  <span>Add Review</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myBooking"
                  className="flex items-center space-x-2"
                >
                  <FaRectangleList />
                  <span>My Booking</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/" className="flex items-center space-x-2">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/menu" className="flex items-center space-x-2">
              <MdContentPasteSearch />
              <span>Menu</span>
            </Link>
          </li>
          <li>
            <Link to="/order/salad" className="flex items-center space-x-2">
              <FaShopify />
              <span>Order</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center space-x-2">
              <BiSolidPhoneCall />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 md:p-4 lg:p-8 md:overflow-y-auto">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
