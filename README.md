# ng stories schematics

This angular schematics generate an storybook file. Following the next folder structure.

```
src/                         project source code
|- app/                      app components
|  |- button/                button component example
|  |- button.component.*     
|  |- button.stories.ts      <-- story generated
|  +- ...                    
```

## Installation

```console
npm install --save-dev ng-stories-schematics
```

## Usage

### Add path and file name on one line
```console
ng g ng-stories-schematics:empty path/name
```

### Add path and file name using arguments

```console
ng g ng-stories-schematics:empty --path path_to_file --name file_name
```

## Advice

If you use vscode I recommend to use [vscode-angular-schematics](https://github.com/cyrilletuzi/vscode-angular-schematics) to easily create stories file.

### Config
Add to settings.json config file this.
```JSON
"ngschematics.schematics": [
  "ng-stories-schematics"
],
```