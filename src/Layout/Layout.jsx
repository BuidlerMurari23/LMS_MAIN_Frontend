import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai"


function Layout({children}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking that is user logged in or not.
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    // for checking the role of logged in user.
    const role = useSelector((state) => state?.auth?.role);

    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 0;
    };

    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    }

    const handleLogout = async (event) => {
        event.preventDefault();

        const res = await dispatch();

        if(res?.payload?.success) navigate('/')
    }


    return(
        <div className="min-h-[90vh] bg-[rgb(1,12,36)] ">
            <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        {/* bg-base-100 text-base-content */}
        {/* text-white z-50   bg-[rgb(49,54,54)] */}
        <div className="drawer-side w-0 ">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 relative text-white bg-[rgb(23,21,49)]">
            {/* close button for drawer */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li className="hover:bg-[rgb(8,7,16)]">
              <Link to={"/"}>Home</Link>
            </li>


            {
              isLoggedIn && role === "SUPERADMIN" && (
                <ul>
                <li className="hover:bg-[rgb(8,7,16)]">
                  <Link to={"/assignRole"} >Assign Role</Link>
                </li>
                <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/course/create"}>Create Course</Link>
                </li>
                <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/course/addlecture"}>Add Lectures</Link>
                </li>
                </ul>
              )
            }

            {/* displaying dashboard, create course and add lectures, if user is logged in */}
            {isLoggedIn && (role === "ADMIN") && (
              <ul>
                <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
              </li>
              <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/course/create"}>Create Course</Link>
              </li>
              <li className="hover:bg-[rgb(8,7,16)]">
                <Link to={"/course/addlecture"}>Add Lectures</Link>
              </li>
              </ul>
            )}

            <li className="hover:bg-[rgb(8,7,16)]">
              <Link to={"/courses"}>All Courses</Link>
            </li>

            <li className="hover:bg-[rgb(8,7,16)]">
              <Link to={"/contact"}>Contact Us</Link>
            </li>

            <li className="hover:bg-[rgb(8,7,16)]">
              <Link to={"/about"}>About Us</Link>
            </li>

            {/* creating the bottom part of drawer */}
            {/* if user is not logged in */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-5">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full border bg-purple-600 hover:bg-purple-500 transition-all ease-in-out duration-300">
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full border bg-pink-500 hover:bg-pink-400 transition-all ease-in-out duration-300">
                    <Link to={"/signup"}>Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {/* if user is logged in */}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-5">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full border bg-purple-600 hover:bg-purple-500 transition-all ease-in-out duration-300">
                    <Link to={"/user/profile"}>Profile</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full border bg-pink-500 hover:bg-pink-400 transition-all ease-in-out duration-300">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
            {children}
            <Footer />
        </div>
    );
};

export default Layout;