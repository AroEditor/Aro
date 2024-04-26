export default function createOverleafUrl(latexContent: string) {
  const base64Content = btoa(unescape(encodeURIComponent(latexContent)));
  const dataUri = `data:application/x-tex;base64,${base64Content}`;

  return `https://www.overleaf.com/docs?snip_uri[]=${encodeURIComponent(dataUri)}&snip_name[]=main.tex`;
}
