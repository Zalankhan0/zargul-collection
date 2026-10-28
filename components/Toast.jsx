"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className={`global-toast ${toastMessage.type || "success"}`}>
      <span>✦ {toastMessage.text}</span>
    </div>
  );
}
