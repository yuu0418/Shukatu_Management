"use client";
import { useState } from "react";
import {
  LayoutGrid,
  Calendar,
  Filter,
  SortAsc,
  Search,
  MoreHorizontal,
} from "lucide-react";
import type { ViewType } from "@/types/types";

const Header = () => {
  const [activeView, setActiveView] = useState<ViewType>("table");

  const views = [
    {
      name: "Table",
      icon: <LayoutGrid size={16} />,
      type: "table" as ViewType,
    },
    {
      name: "Calendar",
      icon: <Calendar size={16} />,
      type: "calendar" as ViewType,
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              就活マネジメント
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center space-x-1">
          {views.map((view) => (
            <button
              type="button"
              key={view.type}
              onClick={() => setActiveView(view.type)}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                activeView === view.type
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{view.icon}</span>
              {view.name}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-gray-400" size={16} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 py-1.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <SortAsc size={16} className="mr-2" />
            Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
