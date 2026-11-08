"use client";

import React from "react";

// Use native browser compositor smooth scrolling for optimal 120fps hardware performance
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
