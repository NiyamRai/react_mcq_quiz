import { Link } from "react-router-dom";
import error from "../Images/error.jpg";
import { useEffect } from "react";

const Error = () => {
  // useEffect(() => {
  //   // Prevent the use of the back button
  //   window.history.pushState(null, null, window.location.href);
  //   window.onpopstate = () => {
  //     window.history.go(1);
  //   };
  // }, []);
  return (
    <div name="home" className=" bg-white h-screen fixed">
      <div>
        <img className="w-2/4 ml-96" src={error} alt="not found" />
        <h3 className="bg-transparent mt-10 text-3xl text-center">
          Ohh! Page Not Found 404
        </h3>
        <p className="text-center mt-2 text-xl">
          We can't seem to find the page you're looking for go back to
          <Link className="text-blue-600 font-medium px-1 text-2xl" to="/">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Error;
