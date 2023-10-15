function Next({ dispatch, index, questions }) {
  if (index === questions.length - 1)
    return <button onClick={() => dispatch({ type: "finish" })}>Finish</button>;
  return <button onClick={() => dispatch({ type: "next" })}>Next</button>;
}

export default Next;
