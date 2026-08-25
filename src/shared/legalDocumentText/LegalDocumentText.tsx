import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import styles from "./LegalDocumentText.module.scss";

export const LegalDocumentText = ({ document }: { document: string }) => {
  const formattedContent = document
    .replace(/\r\n?/g, "\n")

    // Убираем 4 и более пробела в начале строки,
    // иначе Markdown создаёт <pre><code>
    .replace(/^[ \t]{4,}/gm, "")

    .replace(/(https?:\/\/[^\s(]+)(\()/g, "$1 $2")
    .replace(/^(\d+)\.\s{2,}(.+)$/gm, "\n\n## $1. $2\n")
    .replace(/^(\d+(?:\.\d+)+\.)\s+/gm, "\n\n$1 ");

  return (
    <article className={styles.markdownDocument}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {formattedContent}
      </ReactMarkdown>
    </article>
  );
};
