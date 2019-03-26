# Generate GraphQL docs from schema.

* [install](#install)
* [use](#use)
* [plugin](#plugin)

Forked from the excellent but unfortunately unmaintained [graphdoc package](https://github.com/2fd/graphdoc).

## Install

To install globally:
```bash
    npm install -g graphqldoc
```

## Use

### Generate documentation from live endpoint

```bash
    > graphqldoc -e http://localhost:8080/graphql -o ./doc/schema
```

### Generate documentation from IDL file

```bash
    > graphqldoc -s ./schema.graphql -o ./doc/schema
```

### Generate documentation from for the ["modularized schema"](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing) of graphql-tools

```bash
    > graphqldoc -s ./schema.js -o ./doc/schema
```

> `./schema.graphql` must be able to be interpreted with [graphql-js/utilities#buildSchema](http://graphql.org/graphql-js/utilities/#buildschema)


### Generate documentation from json file

```bash
    > graphqldoc -s ./schema.json -o ./doc/schema
```

> `./schema.json` contains the result of GraphQL introspection query.

### Puts the options in your `package.json`

```javascript
     // package.json

    {
        "name": "project",
        // [...]
        "graphqldoc": {
            "endpoint": "http://localhost:8080/graphql",
            "output": "./doc/schema",
        }
    }
```

And execute

```bash
    > graphqldoc
```

### Help

```bash

    > graphqldoc -h
    
    Static page generator for documenting GraphQL Schema v2.4.0

    Usage: node bin/graphqldoc.js [OPTIONS] 

    
    [OPTIONS]:
    -c, --config                   Configuration file [./package.json].
    -e, --endpoint                 Graphql http endpoint ["https://domain.com/graphql"].
    -x, --header                   HTTP header for request (use with --endpoint). ["Authorization: Token cb8795e7"].
    -q, --query                    HTTP querystring for request (use with --endpoint) ["token=cb8795e7"].
    -s, --schema, --schema-file    Graphql Schema file ["./schema.json"].
    -p, --plugin                   Use plugins [default=graphqldoc/plugins/default].
    -t, --template                 Use template [default=graphqldoc/template/slds].
    -o, --output                   Output directory.
    -d, --data                     Inject custom data.
    -b, --base-url                 Base url for templates.
    -f, --force                    Delete outputDirectory if exists.
    -v, --verbose                  Output more information.
    -V, --version                  Show graphqldoc version.
    -h, --help                     Print this help


```

## Plugin

In graphqldoc a plugin is simply an object that controls the content that is displayed
on every page of your document.

This object should only implement the [`PluginInterface`](https://github.com/menewman/graphqldoc/blob/master/lib/interface.d.ts#L12-L117).

### Make a Plugin

To create your own plugin you should only create it as a `plain object`
or a `constructor` and export it as `default`

If you export your plugin as a constructor, when going to be initialized,
will receive three parameters

* `schema`: The full the result of GraphQL instrospection query.
* `projectPackage`: The content of `package.json` of current project (or the content of file defined with `--config` flag).
* `graphqldocPackage`: The content of `package.json` of graphqldoc.

> For performance reasons all plugins receive the reference to the same object
> and therefore should not modify them directly as it could affect the behavior
> of other plugins (unless of course that is your intention)

#### Examples

```typescript

    // es2015 export constructor
    export default class MyPlugin {
        constructor(schema, projectPackage, graphqldocPackage){}
        getAssets() { /* ... */ }
        /* ... */
    }

```

```typescript
    // es2015 export plain object
    export default cost myPlugin = {
        getAssets() { /* ... */ },
        /* ... */
    }
```

```javascript

    // export constructor
    function MyPlugin(schema, projectPackage, graphqldocPackage) { /* ... */ }

    MyPlugin.prototype.getAssets =  function() { /* ... */ };
    /* ... */

    exports.default = MyPlugin;
```

```javascript

    // export plain object

    exports.default = {
        getAssets: function() { /* ... */ },
        /* ... */
    }

```

### Use plugin

You can use the plugins in 2 ways.


#### Use plugins with command line

```bash
    > graphqldoc  -p graphqldoc/plugins/default \
                -p some-dependencie/plugin \
                -p ./lib/plugin/my-own-plugin \
                -s ./schema.json -o ./doc/schema
```

#### Use plugins with `package.json`

```javascript
     // package.json

    {
        "name": "project",
        // [...]
        "graphqldoc": {
            "endpoint": "http://localhost:8080/graphql",
            "output": "./doc/schema",
            "plugins": [
                "graphqldoc/plugins/default",
                "some-dependencie/plugin",
                "./lib/plugin/my-own-plugin"
            ]
        }
    }
```
