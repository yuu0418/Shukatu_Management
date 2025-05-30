"use client";

import { useState } from "react";

import Header from "@/src/components/Header/Header";
import Sidebar from "@/src/components/Sidebar";

import Pending from "../components/Pending";
import TableView from "../features/TableView/components/TableContainer";

export default function Home() {
  const [currentView, setCurrentView] = useState<"table" | "calendar">("table");
  const handleChangeView = (view: "table" | "calendar") => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onChangeView={handleChangeView} />
          {currentView === "table" ? <TableView /> : <Pending />}
        </div>
      </div>
    </div>
  );
}
