import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Mapbox = ({ locations }) => {
  const fallbackCenter = [20, 0]; // Backup center

  // Marker icon setup
  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Handle empty data
  if (!locations || locations.length === 0) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)", // 👈 The Natours slant
        }}
      >
        <p style={{ color: "#666" }}>No locations to display 🗺️</p>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "70vh",
        width: "100%",

        borderRadius: "0",
      }}
    >
      <MapContainer
        center={fallbackCenter}
        zoom={5}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomControl position="topright" />

        {locations.map((loc, i) => {
          const [lng, lat] = loc.coordinates || [];
          if (!lat || !lng) return null;

          return (
            <Marker key={loc._id || i} position={[lat, lng]} icon={icon}>
              <Popup>
                <strong>Day {loc.day}:</strong> {loc.description}
              </Popup>
              <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Day {i + 1} : {loc.description}
                </span>
              </Tooltip>
            </Marker>
          );
        })}

        <FitMapToMarkers locations={locations} />
      </MapContainer>
    </div>
  );
};

// Auto-fit helper
const FitMapToMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (!locations.length) return;

    const validCoords = locations
      .map((loc) => loc.coordinates)
      .filter((c) => c && c.length === 2)
      .map(([lng, lat]) => [lat, lng]);

    if (validCoords.length === 0) return;

    const bounds = L.latLngBounds(validCoords);

    // Initial fit
    setTimeout(() => {
      map.fitBounds(bounds, { padding: [5, 5] });
    }, 300);

    let resetTimer = null;

    const handleMoveStart = () => {
      // User is still dragging → cancel any existing reset
      clearTimeout(resetTimer);
    };

    const handleMoveEnd = () => {
      // Start a timer *after* drag/zoom ends
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        map.flyToBounds(bounds, { padding: [150, 150] });
      }, 2000);
    };

    // Attach both events
    map.on("movestart", handleMoveStart);
    map.on("moveend", handleMoveEnd);

    // Cleanup on unmount
    return () => {
      map.off("movestart", handleMoveStart);
      map.off("moveend", handleMoveEnd);
      clearTimeout(resetTimer);
    };
  }, [locations, map]);

  return null;
};

export default Mapbox;
