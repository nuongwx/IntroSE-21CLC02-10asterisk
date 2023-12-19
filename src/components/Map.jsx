import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, GeolocateControl, Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import style from '@mapbox/mapbox-gl-directions/src/directions_style';

const Map = ({ userLocation, destination }) => {
  const [coords, setCoords] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: userLocation ? userLocation.latitude : 0,
    longitude: userLocation ? userLocation.longitude : 0,
    zoom: 15,
  });

  useEffect(() => {
    if (userLocation) {
      const getRoute = async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.longitude},${userLocation.latitude};106.68250385310697,10.76295153043293?steps=true&geometries=geojson&access_token=pk.eyJ1IjoibnZraW0iLCJhIjoiY2xxYjR6cm9yMDE5dTJvdGs5YTRpOXliNiJ9.dn85UZHYAX91O29JqzqbgA`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch route');
          }

          const data = await response.json();
          console.log(data);
          const coords = data.routes[0].geometry.coordinates;
          console.log(coords);
          setCoords(coords);
        } catch (error) {
          console.error('Error fetching route:', error.message);
        }
      };

      getRoute();
    }
  }, [userLocation, destination]);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'feature',
        geometry: {
          type: 'LineString',
          coordinates: [...coords],
        },
      },
    ],
  };

  const lineStyle = {
    id: 'roadLayer',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#38454c',
      'line-width': 4,
      'line-opacity': 0.75,
    },
  };

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <ReactMapGL
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      mapboxAccessToken="pk.eyJ1IjoibnZraW0iLCJhIjoiY2xxYjR6cm9yMDE5dTJvdGs5YTRpOXliNiJ9.dn85UZHYAX91O29JqzqbgA"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      style={{ width: '100%', height: '50vh' }}
    >
      {/* Marker for user's location */}
      <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} offsetLeft={-10} offsetTop={-10}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'blue', border: '2px solid white' }}></div>
      </Marker>

      {/* Marker for destination */}
      <Marker latitude={destination[1]} longitude={destination[0]} offsetLeft={-20} offsetTop={30}>
        <div>Hello</div>
      </Marker>

      <Source id="routeSource" type="geojson" data={geojson}>
        <Layer {...lineStyle}></Layer>
      </Source>

      <GeolocateControl />
      <NavigationControl />
    </ReactMapGL>
  );
};

export default Map;
