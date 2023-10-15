function Start({ dispatch, numQuestions }) {
  return (
    <div className="start">
      <h3>Welcome to the React Quiz!</h3>
      <p>{numQuestions} questions to test your understanding of React</p>
      <button onClick={() => dispatch({ type: "start" })}>Let's start</button>
    </div>
  );
}

export default Start;
