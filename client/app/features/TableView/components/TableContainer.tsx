"use client";

import { useGetTasks } from "@/app/features/TableView/hooks/useGetTasks";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

const TableContainer = () => {
  const { tasks } = useGetTasks();

  return (
    <table className="w-full border-collapse">
      <TableHeader />
      <tbody className="divide-y divide-gray-200 bg-white">
        {tasks.map((task) => (
          <TableRow key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

export default TableContainer;
