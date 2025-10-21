"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the inner map only on client side
const LeafletMapInner = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
});

// Derive props automatically from the component type
type LeafletMapProps = React.ComponentProps<typeof LeafletMapInner>;

export default function LeafletMap(props: LeafletMapProps) {
  return <LeafletMapInner {...props} />;
}
export type { Point } from "./LeafletMapInner";
