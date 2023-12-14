import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const currentState = location.state;
  console.log(currentState);
  const initialState = {
    isCountdown: false,
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    answers: [1, 2, 3, 4, 1],
  };
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Please enter name.");
    } else {
      navigate(`/quiz/${name}`, { state: initialState });
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  // Disable navigating back in history
  useEffect(() => {
    const disableBack = (e) => {
      e.preventDefault();
      navigate("/");
      return false;
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", disableBack);

    return () => {
      window.removeEventListener("popstate", disableBack);
    };
  }, []);
  return (
    <div className="element ">
      <div
        className="  expand flex flex-col h-3/4 gap-10 font-mono w-max
       ">
        <h1 className="text-5xl font-bold text-white text-center w-full">
          Quizer
        </h1>
        <form
          className="bg-white items-center justify-center w-max p-6  rounded-md flex flex-col gap-3 "
          onSubmit={handleSubmit}>
          <div className="w-full">
            <input
              type="text"
              className="border-2  text-center  font-semibold capitalize p-2 w-full border-gray-300 rounded-sm text-lg "
              placeholder="Enter Your Name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <button className="bg-gray-600 rounded-md text-white text-lg font-semibold hover:scale-y-105 transition-all ease-in-out w-80">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
