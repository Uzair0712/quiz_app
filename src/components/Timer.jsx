import { useEffect } from "react";

function Timer({ dispatch, time }) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;

  useEffect(function () {
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);

    return function () {
      clearInterval(id);
    };
  }, []);
  return (
    <p className="timer">
      {mins < 10 ? "0" + mins : mins}:{secs < 10 ? "0" + secs : secs}
    </p>
  );
}

export default Timer;
