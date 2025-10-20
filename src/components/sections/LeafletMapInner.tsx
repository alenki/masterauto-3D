"use client";

import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export type Point = {
  id: string | number;
  title?: string;
  description?: string;
  coords: [number, number];
};

function FitToMarkers({ points }: { points: Point[] }) {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    const bounds = L.latLngBounds(
      points.map((p) => L.latLng(p.coords[0], p.coords[1]))
    );
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.2));
  }, [map, points]);
  return null;
}

type Props = {
  points?: Point[];
  className?: string;
  height?: string;
  initialCenter?: LatLngExpression;
  initialZoom?: number;
  showGeoJson?: boolean;
};

export default function LeafletMapInner({
  points = [
    {
      id: 1,
      title: "Example",
      description: "Vilnius",
      coords: [54.6872, 25.2797],
    },
  ],
  height = "h-[70vh]",
  initialCenter = [54.6872, 25.2797],
  initialZoom = 10,
  showGeoJson = true,
}: Props) {
  return (
    <div className={`rounded-2xl shadow overflow-hidden ${height}`}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
        />
        {points.map((p) => (
          <Marker key={p.id} position={p.coords}>
            <Popup>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </Popup>
          </Marker>
        ))}
        <FitToMarkers points={points} />
        {showGeoJson && (
          <GeoJSON data={{ type: "FeatureCollection", features: [] }} />
        )}
      </MapContainer>
    </div>
  );
}
