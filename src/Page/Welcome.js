import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Welcome = () => {
  const location = useLocation();
  const currentState = location.state;
  const { userName } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    window.history.replaceState(currentState, "", "/");
    const interval = setInterval(() => {
      if (countdown <= 0) {
        setCountdown(0);
      } else setCountdown((countdown) => countdown - 1);
    }, 999);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Your timeout logic
    const myTimeout = setTimeout(() => {
      navigate(`/quiz/${userName}/1`, {
        state: { ...currentState, isCountdown: true },
      });
    }, 5005);

    // Function to clear the timeout when leaving the page
    const clearMyTimeout = () => {
      clearTimeout(myTimeout);
    };

    // Event listener for beforeunload
    const handleBeforeUnload = () => {
      clearMyTimeout();
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      clearMyTimeout();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {});

  return (
    <div className="element">
      <div className="board">
        <div className=" flex flex-col font-mono  items-center  h-2/3">
          <div className="text-center h-1/2">
            <h1 className="text-5xl font-bold capitalize">
              {"Welcome! " + userName}
            </h1>
            <h1 className="text-xl mt-5">Get ready for the quiz in </h1>
          </div>
          <div className="text-5xl h-1/2 ">
            <div className="border-6 relative border-[#bf0abf] w-20 h-20  flex items-center justify-center rounded-[100%] animate-ping ">
              <h1>{countdown}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
