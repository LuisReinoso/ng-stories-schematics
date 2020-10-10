import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  mergeWith,
  SchematicsException,
  applyTemplates,
  move,
  chain,
} from "@angular-devkit/schematics";
import { CreateStoryOptions } from "./schema";
import { strings, experimental, normalize } from "@angular-devkit/core";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngStoriesSchematics(_options: CreateStoryOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfig = tree.read("/angular.json");
    if (!workspaceConfig) {
      throw new SchematicsException(
        "Could not find Angular workspace configuration"
      );
    }

    const workspaceContent = workspaceConfig.toString();
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(
      workspaceContent
    );

    if (!_options.project) {
      _options.project = workspace.defaultProject;
    }

    const projectName = _options.project as string;
    const project = workspace.projects[projectName];
    const projectType = project.projectType === "application" ? "app" : "lib";

    if (_options.path === undefined) {
      _options.path = `${project.sourceRoot}/${projectType}`;
    }

    const templateSource = apply(url("./files"), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name,
      }),
      move(normalize(_options.path as string)),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
