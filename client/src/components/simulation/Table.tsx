function generateColumnHeaders(length: number) {
  const headers = [];
  for (let i = 0; i < length; i++) {
    let header = "";
    let temp = i;
    while (temp >= 0) {
      header = String.fromCharCode((temp % 26) + 65) + header;
      temp = Math.floor(temp / 26) - 1;
    }
    headers.push(header);
  }
  return headers;
}

export default function Table({ table }: { table: string[][] }) {
  return (
    <div className="flex-grow w-full transition-opacity duration-300 opacity-100">
      <table className="table-auto w-full border-collapse text-center select-none">
        <thead>
          <tr>
            {generateColumnHeaders(table[0].length).map(
              (header: string, index: number) => (
                <th
                  key={index}
                  className={`border border-gray-400 px-4 py-2 bg-[#2563eb] text-white`}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
      </table>
    </div>
  );
}
