export default function extractPositionsWithColors(equation: string) {
  const regex = /(\$?[A-Z]+\$?\d+)(:\$?[A-Z]+\$?\d+)?/g;

  const rangesWithColors: { range: string; cells: string[]; color: string }[] =
    [];
  const colorMap = new Map<string, string>();
  const colorPalette = generateColorPalette(); // Predefined color palette
  let colorIndex = 0;

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

  // Function to get or assign a unique color for the range
  function getOrAssignColor(range: string): string {
    if (!colorMap.has(range)) {
      colorMap.set(range, colorPalette[colorIndex % colorPalette.length]);
      colorIndex++;
    }
    return colorMap.get(range)!;
  }

  let match;
  while ((match = regex.exec(equation)) !== null) {
    const start = match[1];
    const end = match[2] ? match[2].slice(1) : null;
    if (end) {
      const rangeKey = `${start}:${end}`; // Use the full range as a key
      const expandedRange = expandRange(start, end);
      rangesWithColors.push({
        range: rangeKey,
        cells: expandedRange,
        color: getOrAssignColor(rangeKey),
      });
    } else {
      rangesWithColors.push({
        range: start,
        cells: [start],
        color: getOrAssignColor(start),
      });
    }
  }

  return rangesWithColors;
}

// Function to generate a palette of colors
function generateColorPalette(): string[] {
  return [
    "#FF5733",
    "#33FF57",
    "#F39C12",
    "#E74C3C",
    "#2ECC71",
    "#8E44AD",
    "#1ABC9C",
    "#3498DB",
    "#5733FF",
    "#9B59B6",
  ];
}

type RangeWithColor = {
  range: string;
  cells: string[];
  color: string;
};

export function findCellDetails(
  cell: string,
  rangesWithColors: RangeWithColor[]
) {
  for (const range of rangesWithColors) {
    if (range.cells.includes(cell)) {
      return {
        cell,
        range: range.range,
        color: range.color,
      };
    }
  }
  return null; // Cell not found
}
