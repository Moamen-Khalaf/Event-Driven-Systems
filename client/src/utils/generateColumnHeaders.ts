export default function generateColumnHeaders(length: number) {
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
