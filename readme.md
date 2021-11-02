# Dirs Command Shell

Shell for action Create, Move, Delete and List on dir tree

## Getting started

```shell
yarn install
```

## Run interactive shell
> This enable a shell command line for execute line by line
> 
> **CTRL + C** to close command line


```shell
yarn shell
# You are going to need execute command manualy
shellDir$ CREATE fruits 
shellDir$ CREATE vegetables 
shellDir$ CREATE grains 
shellDir$ CREATE fruits/apples 
shellDir$ CREATE fruits/apples/fuji 
shellDir$ LIST 
fruits 
  apples 
    fuji 
grains
vegetables
# what ever command is needed...
```

## Run robot shell
> This run commands listed on `script.ts` string const `robotCommands`
>
> Only shows output


```shell
yarn shell:robot
# Expected output
CREATE fruits 
CREATE vegetables 
CREATE grains 
CREATE fruits/apples 
CREATE fruits/apples/fuji 
LIST 
fruits 
  apples 
    fuji 
grains
vegetables
# ... more output ...
```

## Test TDD
Run test validation for commands
```shell
yarn test
```

## Lint

Run standard code configuration ESLint

```shell
yarn lint # Inspect linter
yarn lint:fix # Inspect and autofix linter
```