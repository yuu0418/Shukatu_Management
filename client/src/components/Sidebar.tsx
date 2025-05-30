import {
  Clock,
  FileText,
  LayoutGrid,
  Plus,
  Search,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-full w-60 flex-col border-r border-gray-200 bg-gray-50">
      <div className="flex items-center space-x-2 border-b border-gray-200 px-4 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-800 text-white">
          S
        </div>
        <span className="text-sm font-medium text-gray-800">
          shukatsu_kanri
        </span>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="px-3 py-2">
          {/* 検索機能 */}
          <div className="mb-1 flex items-center rounded-md px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200">
            <Search size={16} className="mr-2" />
            <span>Search</span>
          </div>
          {/* 更新履歴表示したい */}
          <div className="mb-1 flex items-center rounded-md px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200">
            <Clock size={16} className="mr-2" />
            <span>Updates</span>
          </div>
          {/* 設定 */}
          <div className="mb-1 flex items-center rounded-md px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200">
            <Settings size={16} className="mr-2" />
            <span>Settings</span>
          </div>
        </div>

        <div className="mt-4 px-3">
          <div className="mb-2 px-2 text-xs font-medium uppercase text-gray-500">
            collections
          </div>

          <div className="mb-1 flex items-center rounded-md bg-gray-200 px-2 py-1.5 text-sm font-medium text-gray-800">
            <LayoutGrid size={16} className="mr-2" />
            <span>本選考</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-200">
              <FileText size={16} className="mr-2" />
              <span>インターン</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
        >
          <Plus size={16} className="mr-2" />
          <span>New Page</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
