import unified from "unified";
import markdownToRemarkPlugin from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeToHtml from "rehype-stringify";

export const markdownToHtml = (markdown, {getAsset, resolveWidget} = {}) => {
  const parsed = unified()
    .use(markdownToRemarkPlugin, {fences: true, commonmark: true})
    .parse(markdown);

  const mdast = unified().runSync(parsed);

  const hast = unified()
    .use(remarkToRehype, {allowDangerousHTML: true})
    .runSync(mdast);

  const html = unified()
    .use(rehypeToHtml, {
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
      closeSelfClosing: true,
      entities: {useNamedReferences: true},
    })
    .stringify(hast);

  return html;
};
