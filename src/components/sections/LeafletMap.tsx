"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the inner map only on client side
const LeafletMapInner = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
});

export default function LeafletMap(props: any) {
  return <LeafletMapInner {...props} />;
}
