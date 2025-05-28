import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TableContainer from "./features/TableView/components/TableContainer";

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <TableContainer />
        </div>
      </div>
    </div>
  );
}
