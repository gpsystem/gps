---
name: Code style guide
---

# Code style guide

??? tldr "TL;DR"

    Use comments to explain code that's hard to understand. Use JSDoc comments to explain functions' purposes, their parameters, and their return types (except if they don't return anything). Always annotate variables, function parameters, and function return types, unless they violate [@typescript-eslint/no-inferrable-types][].

- Use comments where necessary.
  - Don't write unnecessary comments like this:
    ```js
    // This is a function
    function func() {
    ```
  - Write comments where a line's intention cannot be clearly understood, like this:
    ```js
    // Explain what the complex logic does
    if (/* complex logic */) {
    ```
  - Write [JSDoc][] comments at the top of functions, like this:
    ```ts
    /**
     * Does something.
     * @param param1 A parameter.
     */
    function func(param1: string): void {
    ```
    - Don't add `@returns` comments to functions that don't return values.
    - Don't annotate the types of values that already have their types explicitly declared (or implicitly inferred)
- Always annotate variables, parameters, and return types.

  ```ts
  // Don't do this!
  const str: string = "";
  const str1 = someFunction();
  function func(param) {
    return;
  }

  // Do this!
  const str = "";
  const str1: string = someFunction();
  function func(param: string): void {
    return;
  }
  ```

  - See [@typescript-eslint/no-inferrable-types][] for more information on annotating variables.

[jsdoc]: https://jsdoc.app/
[@typescript-eslint/no-inferrable-types]: https://typescript-eslint.io/rules/no-inferrable-types
