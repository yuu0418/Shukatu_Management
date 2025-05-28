import type { Status, Task } from "@/types/types";

const statusColors: Record<Status, string> = {
  通過: "bg-green-100 text-green-800",
  結果待ち: "bg-blue-100 text-blue-800",
  応募予定: "bg-gray-100 text-gray-800",
  落選: "bg-red-100 text-red-800",
};

type Props = {
  task: Task;
};

export const TableRow = ({ task }: Props) => {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <tr className="group hover:bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{task.name}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {task.nextStep || "—"}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {formatDate(task.dueDate) || "—"}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag, idx) => (
            <span
              key={task.id}
              className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
};
