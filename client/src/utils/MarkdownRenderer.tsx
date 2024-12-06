import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown className="prose" remarkPlugins={[remarkMath]}>
      {content}
    </ReactMarkdown>
  );
}
