import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Start from "./components/Start";
import Footer from "./components/Footer";
import Next from "./components/Next";
import Timer from "./components/Timer";
import FinishScreen from "./components/FinishScreen";
import Loader from "./components/Loader";
import Error from "./components/Error";

const TIME_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  // ready, finish, active,loading
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * TIME_PER_QUESTION,
      };
    case "data-recieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error": {
      return { ...state, status: "error" };
    }
    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };

    case "tick":
      if (state.time === 0)
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      return { ...state, time: state.time - 1 };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, time, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:5000/questions");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "data-recieved", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
        console.error("🔥" + err);
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questions={questions}
              points={points}
              answer={answer}
              maxPoints={maxPoints}
            />
            <Question
              index={index}
              questions={questions}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} time={time} />
              {answer !== null && (
                <Next dispatch={dispatch} index={index} questions={questions} />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            highScore={highScore}
            maxPoints={maxPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
