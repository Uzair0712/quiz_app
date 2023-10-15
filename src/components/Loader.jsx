function Loader() {
  return (
    <div className="loader">
      <div className="system-container">
        <div className="sun"></div>
        <div className="earth-container">
          <div className="moon"></div>
          <div className="earth"></div>
        </div>
      </div>
      <p>Loading data...</p>
    </div>
  );
}

export default Loader;
