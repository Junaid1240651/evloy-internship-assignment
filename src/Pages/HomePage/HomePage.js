import React, { useState } from "react";
import Speedometer from "react-d3-speedometer";
import "./HomePage.css";
function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [averageSearchVolume, setAverageSearchVolume] = useState("");
  const [showData, setShowData] = useState(false);
  const isFormValid = keyword && startDate && endDate;

  const api_key = "AIzaSyB0o5CoudLxen1Nz2q9-ERGbX6wWtxcjRQ";

  const onSubmitKeywordForm = async (event) => {
    event.preventDefault();

    if (startDate === endDate) {
      alert("Start date and end date cannot be the same.");
      return;
    } else {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&publishedAfter=${startDate}T00:00:00Z&publishedBefore=${endDate}T23:59:59Z&key=${api_key}`
      );
      const data = await response.json();
      const responseVolume = data.pageInfo.totalResults;

      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const days = Math.ceil(
        (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
      );

      setAverageSearchVolume((responseVolume / days).toFixed(2));
      setShowData(true);
    }
  };
  const speedometerValue = Math.floor(averageSearchVolume / 100);

  return (
    <form className="App" onSubmit={onSubmitKeywordForm}>
      <h1 className="form-heading">Enter a Youtube Keyword</h1>
      <input
        value={keyword}
        autoFocus
        type="text"
        placeholder="Enter a Keyword"
        className="keyword-input"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <label htmlFor="startDate" className="date-text">
        Enter Start Date
      </label>
      <input
        value={startDate}
        type="date"
        id="startDate"
        className="keyword-input"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate" className="date-text">
        Enter End Date
      </label>
      <input
        value={endDate}
        type="date"
        id="endDate"
        className="keyword-input"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit" disabled={!isFormValid} className="submit-btn">
        Submit
      </button>
      {showData && (
        <div className="result-container">
          <p className="final-text">
            Average daily search keyword volume for "{keyword}" since {endDate}{" "}
            = {averageSearchVolume} search/day
          </p>
          <div className="speedometer-container">
            <Speedometer
              value={speedometerValue}
              segments={5}
              startColor="red"
              endColor="darkgreen"
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default HomePage;
