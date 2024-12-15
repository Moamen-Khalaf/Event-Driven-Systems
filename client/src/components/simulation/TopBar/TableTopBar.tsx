import TableInputBar from "./TableInputBar";
import TableOptions from "./TableOptions";

export function TableTopBar() {
  return (
    <div className="flex items-center bg-secondary w-full border border-foreground text-primary">
      <TableInputBar />
      <TableOptions />
    </div>
  );
}
