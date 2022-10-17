import fs from "fs";
import pdf from "html-pdf";

export const createFile = (document) => {
  const { id, content, title } = document;
  const name = `./files/${id}-${title}.txt`;
  fs.writeFileSync(name, JSON.stringify({ id, title, content }), {
    encoding: "utf-8",
  });

  const contentHTML = formatText(document);
  pdf.create(contentHTML, {}).toFile(`./files/${id}.pdf`, (err, res) => {
    if (err) return console.log(err);
    return console.log(res);
  });
  return "Arquivo criado com sucesso";
};

const formatText = ({ id, content, title }) => {
  console.log(content[0]);
  const contentHTML = `
  <span style="text-align: right;display: block;">${id}</span>
  <h1 style="text-align: center; ">${title}</h1>
  <hr>
  ${content.map((val) => {
    return `<p>${val}</p>`;
  })}
  `;
  return contentHTML;
};
