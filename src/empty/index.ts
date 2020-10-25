import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  mergeWith,
  SchematicsException,
  move,
  chain,
  template,
} from "@angular-devkit/schematics";
import { parseName } from "@schematics/angular/utility/parse-name";
import { CreateStoryOptions } from "./schema";
import {
  buildDefaultPath,
  getWorkspace,
} from "@schematics/angular/utility/workspace";
import { strings, normalize } from "@angular-devkit/core";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngStoriesSchematics(_options: CreateStoryOptions): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    if (!workspace) {
      throw new SchematicsException(
        "Could not find Angular workspace configuration"
      );
    }
    
    let projectKey = _options.project;
    if (!_options.project) {
      projectKey = [...workspace.projects.keys()][0];
    }

    const project = workspace.projects.get(projectKey as string);

    let location = null
    if (project) {
      location = parseName(
        _options.path === undefined ? buildDefaultPath(project) : _options.path,
        _options.name
      );
    } else {
      throw new SchematicsException(  
        "Could not find Angular project " + projectKey
      );
    }
   
    const { path: componentPath, name } = location;

    if (!name) {
      throw new SchematicsException(  
        "Could not file name"
      );
    }


    const templateSource = apply(url("./files"), [
      template({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: name,
      }),
      move(normalize(componentPath)),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
