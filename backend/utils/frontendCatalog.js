import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findProductsSource() {
  const candidates = [
    path.resolve(process.cwd(), "src/lib/products.ts"),
    path.resolve(process.cwd(), "../src/lib/products.ts"),
    path.resolve(__dirname, "../../src/lib/products.ts"),
  ];

  const sourcePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!sourcePath) {
    throw new Error("Could not find src/lib/products.ts to seed frontend catalog data.");
  }
  return sourcePath;
}

export function loadFrontendCatalog() {
  const sourcePath = findProductsSource();
  const source = fs.readFileSync(sourcePath, "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: sourcePath,
  }).outputText;

  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    console,
    require(specifier) {
      throw new Error(`Unsupported import while loading frontend catalog: ${specifier}`);
    },
  };

  vm.runInNewContext(js, context, { filename: sourcePath });
  return module.exports;
}
