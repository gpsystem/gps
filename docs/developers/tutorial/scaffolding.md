---
name: Scaffolding
---

# Scaffolding

A plugin is much easier created in a Node.js project than in a single file. This guide uses the officially supported CLI to scaffold out a Node.js project for a plugin.

<!-- TODO: use a code annotation -->

```console
npm init geofs-plugin ./plugin
```

<!-- Collapsible note that is initially expanded -->

???+ warning

    Keep in mind that `create-geofs-plugin`, the official scaffolding CLI, is still in major version 0. While it still works, there are still features yet to be added, and it is not completely ready for reliable use. See `create-geofs-plugin`'s [documentation] for more information.

`./plugin` is the path to the directory where the project gets scaffolded. See `create-geofs-plugin`'s [documentation] for more information on usage.

`create-geofs-plugin` will ask for more input, and then scaffold out the plugin project.

```console
C:\Users\progr\Downloads>npm init geofs-plugin ./test

Let's create a plugin!
Hit enter to accept the suggestion.

? App name: test-plugin
? Description of app: A GeoFS plugin
? Author's full name: Example
? Author's email address (used for documentation purposes only): email@example.com
? GitHub user or org name: example-user
? Repository name: test-plugin
? Which template would you like to use? basic-js => The basic template. Uses Babel.
created file: C:\Users\progr\Downloads\test\.editorconfig
created file: C:\Users\progr\Downloads\test\.eslintrc.yml
created file: C:\Users\progr\Downloads\test\.gitignore
created file: C:\Users\progr\Downloads\test\CODE_OF_CONDUCT.md
created file: C:\Users\progr\Downloads\test\CONTRIBUTING.md
created file: C:\Users\progr\Downloads\test\LICENSE
created file: C:\Users\progr\Downloads\test\README.md
created file: C:\Users\progr\Downloads\test\babel.config.js
created file: C:\Users\progr\Downloads\test\manifest.json
created file: C:\Users\progr\Downloads\test\package.json
created file: C:\Users\progr\Downloads\test\src\index.js
created file: C:\Users\progr\Downloads\test\webpack.config.js

Finished scaffolding!
Initialized a Git repository

Successfully created test-plugin.
See your README (located at test\README.md) for more usage instructions.
Enjoy building your plugin!
```

<!-- cspell:disable -->

[documentation]: https://gpsystem.github.io/create-geofs-plugin
