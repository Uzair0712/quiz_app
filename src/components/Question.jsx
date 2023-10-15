function Question({ questions, index, dispatch, answer }) {
  const question = questions.at(index);
  return (
    <div className="question">
      <p>{question.question}</p>
      {question.options.map((option, i) => (
        <button
          className={`${
            answer !== null
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${i === answer && "selected"}`}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "answer", payload: i })}
          key={i}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Question;
