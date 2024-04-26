export default function downloadLatexFile(latexContent: string) {
  const base64Content = btoa(unescape(encodeURIComponent(latexContent)));
  const dataUri = `data:application/x-tex;base64,${base64Content}`;

  // Create an anchor element and trigger a click to download the file
  const element = document.createElement("a");
  element.setAttribute("href", dataUri);
  element.setAttribute("download", "main.tex");
  document.body.appendChild(element); // Append the element to the body
  element.click(); // Programmatically click the element to trigger the download
  document.body.removeChild(element); // Remove the element from the DOM after download
}
