import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Questions from "../Data/Questions";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentState = location?.state;
  const [prevAttempts, setPrevAttempts] = useState(0);

  var score = 0;
  if (currentState?.question1) score = score + 1;
  if (currentState?.question2) score = score + 1;
  if (currentState?.question3) score = score + 1;
  if (currentState?.question4) score = score + 1;
  if (currentState?.question5) score = score + 1;

  useEffect(() => {
    // Disable navigating back in history
    if (!location.state) {
      alert("Navigating to home!");
      navigate("/");
    }

    const disableBack = (e) => {
      e.preventDefault();
      if (window.confirm("Go back to home!") == true) {
        navigate("/");
      } else
        navigate(location?.pathname, {
          state: location?.state,
        });
      return false;
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", disableBack);

    return () => {
      window.removeEventListener("popstate", disableBack);
    };
  }, []);

  return (
    <div className="element">
      <div className="board relative">
        <div className=" flex flex-col font-mono  items-center  justify-between h-3/5  w-max  ">
          <Link
            to={"/"}
            className="underline text-blue-500 text-sm absolute bottom-[4%]">
            Re-attempt
          </Link>
          <h1 className="text-3xl font-semibold max-w-[90%]">You Scored</h1>
          {/* Score Bar */}
          <div className="flex w-full items-center justify-center">
            <div
              className={
                "border-y w-full " + (score >= 1 && "bg-blue-400 h-2")
              }></div>
            <div
              className={
                "border-y w-full " + (score >= 2 && "bg-blue-400 h-2")
              }></div>
            <div
              className={
                "border-y w-full " + (score >= 3 && "bg-blue-400 h-2")
              }></div>
            <div
              className={
                "border-y w-full " + (score >= 4 && "bg-blue-400 h-2")
              }></div>
            <div
              className={
                "border-y w-full " + (score >= 5 && "bg-blue-400 h-2")
              }></div>
            <span className="pl-2 text-gray-500">{score + "/5"}</span>
          </div>

          {/* Questions */}
          <div className="flex flex-col  w-max gap-3 max-[900px]:text-[13px] max-[1200px]:text-sm max-[720px]:text-[12px] max-[500px]:text-[10px]">
            <div
              className={
                " py-2 px-4 border w-full " +
                (currentState?.question1
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500")
              }>
              {Questions?.questions[0]?.question}
            </div>
            <div
              className={
                " py-2 px-4 border w-full " +
                (currentState?.question2
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500")
              }>
              {Questions?.questions[1]?.question}
            </div>
            <div
              className={
                " py-2 px-4 border w-full " +
                (currentState?.question3
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500")
              }>
              {Questions?.questions[2]?.question}
            </div>
            <div
              className={
                " py-2 px-4 border w-full " +
                (currentState?.question4
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500")
              }>
              {Questions?.questions[3]?.question}
            </div>
            <div
              className={
                " py-2 px-4 border w-full " +
                (currentState?.question5
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500")
              }>
              {Questions?.questions[4]?.question}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
