import { Mark } from "@tiptap/core";

interface Node {
  type: string;
  content?: Node[];
  text?: string;
  marks?: Mark[];
  attrs?: {
    level?: number; // For headings to specify their level
    data?: string;
    textAlign?: string;
  };
}

const convertMarksToLaTeX = (text: string, marks?: Mark[]): string => {
  if (!marks || marks.length === 0) return text;

  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "strong":
        return `\\textbf{${acc}}`; // Bold text
      case "em":
        return `\\textit{${acc}}`; // Italic text
      case "code":
        return `\\texttt{${acc}}`; // Monospace text
      default:
        return acc;
    }
  }, text);
};

const convertNodeToLaTeX = (node: Node): string => {
  const applyTextAlignment = (content: string, alignment?: string): string => {
    switch (alignment) {
      case "center":
        return `\\begin{center}${content}\\end{center}`;
      case "right":
        return `\\begin{flushright}${content}\\end{flushright}`;
      case "justify":
        return `\\begin{justify}${content}\\end{justify}`; // Requires `ragged2e` package
      default:
        return content;
    }
  };

  const generateLaTeX = (node: Node): string => {
    switch (node.type) {
      case "doc":
        return `\\documentclass{article}\n\\usepackage{graphicx}\n\\usepackage{ragged2e}\n\\begin{document}\n\n${node.content?.map(convertNodeToLaTeX).join("\n\n") ?? ""}\n\n\\end{document}`;
      case "paragraph":
        const pcommand = node.content?.map(convertNodeToLaTeX).join("") ?? "";
        return applyTextAlignment(pcommand, node.attrs?.textAlign);
      case "text":
        return convertMarksToLaTeX(node.text || "", node.marks);
      case "math_inline":
        return `\\(${node.content?.map(convertNodeToLaTeX).join("") ?? ""}\\)`;
      case "bullet_list":
        return `\\begin{itemize}\n${node.content?.map(convertNodeToLaTeX).join("") ?? ""}\\end{itemize}`;
      case "list_item":
        return `  \\item ${node.content?.map(convertNodeToLaTeX).join("") ?? ""}\n`;
      case "table":
        const headers = node.content?.[0].content?.map(() => "l").join(" | ");
        const body =
          node.content
            ?.map(
              (row, index) =>
                row.content?.map(cell => convertNodeToLaTeX(cell)).join(" & ") +
                (index === 0 ? " \\\\ \\hline" : " \\\\") // Add \hline after the header row
            )
            .join("\n") ?? "";
        return `\\begin{figure}[h]\n\\centering\\begin{tabular}{${headers}}\n${body}\n\\end{tabular} \\end{figure}`;
      case "tableRow":
        return node.content?.map(convertNodeToLaTeX).join(" & ") ?? "";
      case "tableHeader":
        return `\\textbf{${node.content?.map(convertNodeToLaTeX).join("") ?? ""}}`;
      case "tableCell":
        return node.content?.map(convertNodeToLaTeX).join("") ?? "";
      case "heading":
        const level = node.attrs?.level || 1;
        if (level === 1) {
          return `\\title{${node.content?.map(convertNodeToLaTeX).join("") ?? ""}}\n\\author{AUTHOR NAME}\n\\maketitle`;
        }
        const hcommand = `\\${"sub".repeat(level - 2)}section{${node.content?.map(convertNodeToLaTeX).join("") ?? ""}}`;
        return applyTextAlignment(hcommand, node.attrs?.textAlign);
      case "math-editor":
        return `\\begin{equation}${node.attrs?.data}\\end{equation}`;
      default:
        return "";
    }
  };

  return generateLaTeX(node); // Generate LaTeX with potential text alignment.
};

export default convertNodeToLaTeX;
