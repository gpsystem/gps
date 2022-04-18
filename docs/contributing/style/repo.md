---
name: Repository style guide
---

# Repository style guide

??? tldr "TL;DR"

    We use [prettier code style][], [conventional commit messages][], and [cspell spelling][] to ensure basic code quality. All commits run tests on CI servers. Those tests include typechecking using Microsoft's [TypeScript][], checking [prettier code style][], and linting with [eslint][] and [typescript-eslint][].

- Use [prettier code style][].
- Use [conventional commit messages][].
  - We recommend using commitizen to make commit messages easier.
    - This repository is not yet commitizen friendly, check back soon!
- [Use US spelling][].
  - We check spelling with [cspell][]. If cspell throws an incorrect spelling error, you may add the word to the `words` array in the top-level `.cspell.json` config file.

???+ important

    We use [husky][] to enforce critical parts of this style guide. Husky will prevent a git commit from occurring with non-prettier code or a malformed commit message.

[husky]: https://typicode.github.io/husky/#/
[prettier code style]: https://prettier.io/
[conventional commit messages]: https://commitlint.js.org/
[use us spelling]: https://docs.microsoft.com/en-us/style-guide/word-choice/use-us-spelling-avoid-non-english-words
[cspell]: https://streetsidesoftware.github.io/cspell/
[cspell spelling]: https://streetsidesoftware.github.io/cspell/
[typescript]: https://www.typescriptlang.org/
[eslint]: https://eslint.org/
[typescript-eslint]: https://typescript-eslint.io/
