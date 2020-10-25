import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("ng-stories-schematics", () => {
  const runner = new SchematicTestRunner("schematics", collectionPath);
  const projectRootName = "projects";
  const projectName = "stories-testing";
  const sourcePath = `/${projectRootName}/${projectName}/src`;

  const workspaceOptions = {
    name: "workspace",
    newProjectRoot: projectRootName,
    version: "1",
  };
  const appOptions = {
    name: projectName,
  };

  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await runner
      .runExternalSchematicAsync(
        "@schematics/angular",
        "workspace",
        workspaceOptions
      )
      .toPromise();
    tree = await runner
      .runExternalSchematicAsync(
        "@schematics/angular",
        "application",
        appOptions,
        tree
      )
      .toPromise();
  });

  it("should add stories files to app folder", async () => {
    tree = await runner
      .runSchematicAsync("empty", { name: "app" }, tree)
      .toPromise();
    expect(tree.exists(`${sourcePath}/app/app.stories.ts`)).toBeTruthy();
  });

  it("should add stories named test to app folder", async () => {
    tree = await runner
      .runSchematicAsync("empty", { name: "test" }, tree)
      .toPromise();
    expect(tree.exists(`${sourcePath}/app/test.stories.ts`)).toBeTruthy();
  });

  it("should add stories named test to nav folder", async () => {
    tree = await runner
      .runExternalSchematicAsync(
        "@schematics/angular",
        "component",
        { path: `${sourcePath}/app`, name: "nav", skipImport: true },
        tree
      )
      .toPromise();
    tree = await runner
      .runSchematicAsync("empty", { name: "nav/test" }, tree)
      .toPromise();
    expect(tree.exists(`${sourcePath}/app/nav/test.stories.ts`)).toBeTruthy();
  });

  it("should add stories using path on app folder", async () => {
    tree = await runner
      .runSchematicAsync("empty", { name: "", path: `${sourcePath}/app/nav`}, tree)
      .toPromise();
    console.log('files', tree.files);

    expect(tree.exists(`${sourcePath}/app/nav/test.stories.ts`)).toBeTruthy();
  });
});
