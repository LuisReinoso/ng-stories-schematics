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

```console
ng g ng-stories-schematics:ng-stories-schematics  --name component_name
```