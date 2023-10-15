function FinishScreen({ dispatch, points, maxPoints, highScore }) {
  const score = Math.round((points / maxPoints) * 100);
  let emoji;
  if (score >= 70) emoji = "😍";
  else if (score < 70 && score > 40) emoji = "🤨";
  else emoji = "😥";

  return (
    <div className="finish">
      <p className="result">
        {emoji} You scored <b>{points}</b> out of <b>{maxPoints}</b> ({score}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
