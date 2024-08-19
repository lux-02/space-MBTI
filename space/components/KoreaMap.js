import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

const zoom = 7;

const KoreaMap = () => {
  const mapRef = useRef(null);
  const [polygons, setPolygons] = useState([]);
  const [bounds, setBounds] = useState(null);

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      if (bounds) {
        map.fitBounds(bounds);
      }
    },
    [bounds]
  );

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#000000" }],
            },
            {
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#FFFFFF" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#555555" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#222222" }],
            },
          ],
          disableDefaultUI: true,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            paths={polygon.paths}
            options={{
              fillColor: "#FFFFFF",
              fillOpacity: 0.5,
              strokeColor: "#FFFFFF",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
            onClick={() => {
              console.log(`Clicked on polygon: ${polygon.name}`);
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default KoreaMap;
