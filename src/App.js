/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";

const App = () => {
  const [selectedShow, setSelectedShow] = useState(null);

  const handleSelectShow = (show) => {
    setSelectedShow(show);
  };

  const handleGoBack = () => {
    setSelectedShow(null);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<ShowList onSelectShow={handleSelectShow} />}
        />
        <Route
          path="/detail/:id"
          element={<ShowDetail show={selectedShow} />}
        />
      </Routes>
      {selectedShow && <Link to="/">Go Back</Link>}
    </div>
  );
};

export default App;
