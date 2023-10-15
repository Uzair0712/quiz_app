function Progress({ index, questions, points, answer, maxPoints }) {
  return (
    <div className="progress">
      <progress
        value={answer === null ? index : index + 1}
        max={questions.length}
      />
      <div className="progress-stats">
        <p>
          Qustion {index + 1}/{questions.length}
        </p>
        <p>
          {points}/{maxPoints}
        </p>
      </div>
    </div>
  );
}

export default Progress;
