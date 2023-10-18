import React from "react";
import "./SearchResults.css";

export default function SearchResults({ results }) {
  return (
    <div className="result-list">
      {results?.map((val, idx) => {
        return (
          <div key={idx} className="eachResult">
            {val.title}
          </div>
        );
      })}
    </div>
  );
}
