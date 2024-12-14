import { TableHeader } from "./TableHeader";
import TableContnet from "./TableContnet";
import { TableTopBar } from "../TopBar/TableTopBar";

export default function Table() {
  return (
    <div id="table">
      <TableTopBar />
      <div className="flex-grow w-full transition-opacity duration-300 opacity-100 max-h-[95vh] overflow-auto">
        <table className="table-auto w-full border-collapse text-center select-none">
          <TableHeader />
          <TableContnet />
        </table>
      </div>
    </div>
  );
}
