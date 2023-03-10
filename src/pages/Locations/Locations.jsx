import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLocationList } from "../../store/reducers/location";

import "./locations.css";

const Locations = () => {
  const { locationList } = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
      fetch("https://rickandmortyapi.com/api/location/")
        .then((response) => response.json())
        .then((data) => {
          dispatch(setLocationList(data.results));
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
        });

  }, []);

  const renderLocations = () => {

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (locationList.length === 0) {
      return <p>No locations found.</p>;
    }

    return locationList.map((location) => (
      <Link key={location.id} to={`/?location=${location.id}`}>
        <div className="location-card">
          <h2>{location.name}</h2>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          <p>Number of Residents: {location.residents.length}</p>
        </div>
      </Link>
    ));

  }

  return (
    <div className="container">
      <h1>Locations</h1>
      <div className="locations-grid">{renderLocations()}</div>
    </div>
  )
}

export default React.memo(Locations)