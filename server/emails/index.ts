import fs from "fs";
import path from "path";

export function loadEmailTemplate(templateName: string, variables: Record<string, string>) {
  const filePath = path.join(__dirname, "templates", templateName);
  let content = fs.readFileSync(filePath, "utf-8");

  for (const key in variables) {
    content = content.replace(new RegExp(`{{${key}}}`, "g"), variables[key]);
  }

  return content;
}
