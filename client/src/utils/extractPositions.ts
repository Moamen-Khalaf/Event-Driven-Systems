export default function extractPositions(equation: string) {
  const regex = /(\$?[A-Z]+\$?\d+)(:\$?[A-Z]+\$?\d+)?/g;

  const positions: string[] = [];
  let match;

  // Function to expand a range into individual cells
  function expandRange(start: string, end: string) {
    const range: string[] = [];
    const startCol = start.match(/[A-Z]+/)![0];
    const startRow = parseInt(start.match(/\d+/)![0], 10);
    const endCol = end.match(/[A-Z]+/)![0];
    const endRow = parseInt(end.match(/\d+/)![0], 10);

    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = startCol.charCodeAt(0);
        col <= endCol.charCodeAt(0);
        col++
      ) {
        range.push(String.fromCharCode(col) + row);
      }
    }
    return range;
  }

  while ((match = regex.exec(equation)) !== null) {
    const start = match[1];
    const end = match[2] ? match[2].slice(1) : null;
    if (end) {
      const expandedRange = expandRange(start, end);
      positions.push(...expandedRange);
    } else {
      positions.push(start);
    }
  }

  return positions;
}
