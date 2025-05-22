import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TableView from "@/components/TableView";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <TableView />
        </div>
      </div>
    </div>
  );
}
