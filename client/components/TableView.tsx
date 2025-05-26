import { CheckCircle, Circle, ChevronDown } from "lucide-react";

type Status = "通過" | "結果待ち" | "応募予定" | "落選";

interface Task {
  id: string;
  name: string;
  status: Status;
  nextStep: string | null;
  dueDate: string | null;
  tags: string[];
}

// ステータス
const statusColors: Record<Status, string> = {
  通過: "bg-green-100 text-green-800",
  結果待ち: "bg-blue-100 text-blue-800",
  応募予定: "bg-gray-100 text-gray-800",
  落選: "bg-red-100 text-red-800",
};

const TableView: React.FC = () => {
  const tasks: Task[] = [
    {
      id: "1",
      name: "aaa株式会社",
      status: "結果待ち",
      nextStep: "面接",
      dueDate: "2025-05-10",
      tags: ["フロントエンド", "Webアプリ", "React"],
    },
    {
      id: "2",
      name: "bbbbb",
      status: "応募予定",
      nextStep: "書類選考",
      dueDate: "2025-05-15",
      tags: ["インフラ", "サーバー"],
    },
    {
      id: "3",
      name: "ccc株式会社",
      status: "通過",
      nextStep: null,
      dueDate: null,
      tags: ["バックエンド"],
    },
    {
      id: "4",
      name: "dddd",
      status: "応募予定",
      nextStep: "書類選考",
      dueDate: "2025-05-12",
      tags: ["データベース", "SQL"],
    },
    {
      id: "5",
      name: "ee",
      status: "通過",
      nextStep: null,
      dueDate: null,
      tags: ["React", "TypeScript"],
    },
    {
      id: "6",
      name: "ffff株式会社",
      status: "落選",
      nextStep: "面接",
      dueDate: "2025-05-08",
      tags: ["Ruby", "Rails"],
    },
    {
      id: "7",
      name: "ggg株式会社",
      status: "結果待ち",
      dueDate: "2025-05-22",
      nextStep: "コーディングテスト",
      tags: ["フロントエンド"],
    },
  ];

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
    <div className="flex-1 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            <th className="w-8 px-6 py-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center">
                <span>企業名</span>
                <ChevronDown className="ml-1" size={14} />
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center">
                <span>ステータス</span>
                <ChevronDown className="ml-1" size={14} />
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center">
                <span>次のステップ</span>
                <ChevronDown className="ml-1" size={14} />
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center">
                <span>日程・締切</span>
                <ChevronDown className="ml-1" size={14} />
              </div>
            </th>
            <th className="px-6 py-3">
              <div className="flex items-center">
                <span>タグ</span>
                <ChevronDown className="ml-1" size={14} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tasks.map((task) => (
            <tr key={task.id} className="group hover:bg-gray-50">
              <td className="w-8 px-6 py-4">
                <div className="flex items-center">
                  {task.status === "通過" ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} className="text-gray-300" />
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {task.name}
                </div>
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
                      key={idx}
                      className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
