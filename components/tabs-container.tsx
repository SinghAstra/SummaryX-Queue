"use client";

import type React from "react";

import { Tabs } from "@/components/ui/tabs";

export default function TabsContainer({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  return <Tabs defaultValue={defaultValue}>{children}</Tabs>;
}
