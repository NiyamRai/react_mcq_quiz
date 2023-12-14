import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Questions from "../Data/Questions";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionNo, userName } = useParams();
  const currentState = location.state;
  const [isEvaluate, setEvaluate] = useState(false);
  const [selectedOption, setSelected] = useState(null);
  const [isCorrect, setCorrect] = useState(false);
  const intQuestionNo = parseInt(questionNo);
  const [showOption, setShowOption] = useState(false);
  console.log(location);
  const handleOptionSelect = (optionId) => {
    if (selectedOption === null) {
      setSelected(optionId);
    }
    setTimeout(() => {
      setEvaluate(true);
    }, 1000);
    if (
      Questions?.questions?.slice(questionNo - 1, undefined)[0]
        ?.correctAnswer ===
      Questions?.questions?.slice(questionNo - 1, undefined)[0]?.options[
        optionId
      ]
    ) {
      setTimeout(() => {
        setCorrect(true);
      }, 1000);
    }

    // if(currentState?.answer)
  };
  useEffect(() => {
    if (!currentState?.isCountdown === true) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setEvaluate(false);
    setSelected(null);
    setCorrect(false);
    setShowOption(false);
    setTimeout(() => {
      setShowOption(true);
    }, 500);
  }, [navigate]);
  useEffect(() => {
    if (isEvaluate) {
      setTimeout(() => {
        if (intQuestionNo === 1) {
          navigate(`/quiz/${userName}/${intQuestionNo + 1}`, {
            state: { ...currentState, question1: isCorrect },
          });
        } else if (intQuestionNo === 2)
          navigate(`/quiz/${userName}/${intQuestionNo + 1}`, {
            state: { ...currentState, question2: isCorrect },
          });
        else if (intQuestionNo === 3)
          navigate(`/quiz/${userName}/${intQuestionNo + 1}`, {
            state: { ...currentState, question3: isCorrect },
          });
        else if (intQuestionNo === 4)
          navigate(`/quiz/${userName}/${intQuestionNo + 1}`, {
            state: { ...currentState, question4: isCorrect },
          });
        else
          navigate(`/result/${userName}`, {
            state: {
              ...currentState,
              question5: isCorrect,
              isCountdown: false,
            },
          });

        // window.location.reload();
      }, 1000);
    }
  }, [isEvaluate]);

  // Disable navigating back in history
  useEffect(() => {
    const disableBack = (e) => {
      e.preventDefault();
      navigate(location?.pathname, { state: currentState });
      return false;
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", disableBack);

    return () => {
      window.removeEventListener("popstate", disableBack);
    };
  }, [navigate]);
  return (
    <div className="element">
      <div className="board relative expand">
        {/* correct or not */}
        {isEvaluate &&
          (isCorrect ? (
            <div className="absolute right-8 top-8 zoomOut">
              <FcApproval className="text-4xl" />
            </div>
          ) : (
            <div className="absolute right-8 top-8 zoomOut">
              <FcHighPriority className="text-4xl" />
            </div>
          ))}
        <div
          className={
            " flex flex-col font-mono  items-center   h-3/5  w-full max-[720px]:h-4/5" +
            (showOption ? " justify-between" : " justify-center")
          }>
          <h1 className="text-3xl font-semibold max-w-[90%]">
            {Questions?.questions?.slice(questionNo - 1, 5)[0]?.question}
          </h1>
          {showOption && (
            <div className="grid grid-cols-2  w-2/3 gap-2 text-white font-semibold text-xl max-[720px]:grid-cols-1 ">
              {Questions?.questions
                ?.slice(questionNo - 1, 5)[0]
                ?.options?.map((elem, index) => {
                  return (
                    <>
                      <button
                        className={
                          "p-4 w-full  h-full popup " +
                          (isEvaluate
                            ? Questions?.questions?.slice(
                                questionNo - 1,
                                undefined
                              )[0]?.correctAnswer === elem
                              ? "bg-[#609e0f]"
                              : selectedOption == index
                              ? "bg-[#bb3814]"
                              : "bg-[#360e63]"
                            : selectedOption == index
                            ? "bg-[#609e0f]"
                            : "bg-[#360e63]")
                        }
                        key={index}
                        onClick={() => handleOptionSelect(index)}>
                        {elem}
                      </button>
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
