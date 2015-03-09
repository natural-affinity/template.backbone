template.backbone
=================

Template for bootstrapping a backbone-based front-end development process.

Prerequisites
-------------
* Node.js (v0.10.x)
* Ruby (2.0.0 x64)
* Ruby Devkit (Windows-only)
* Livereload (Browser Plugin)

Defaults
--------
* Build: Grunt
* Icons: Font-Awesome
* Styles: Bootstrap, Sass
* Framework: Backbone
* Templates: Handlebars, Jade

Features
--------
* Application Setup Scripts
* Suggested Directory Layout
* Sample View Namespaced-Mixins
* Environment-based JSON Configurations
* Quick Watch-Livereload Refactor Cycle

Usage and Documentation
-----------------------
Please ensure all dependencies have been installed prior to usage.

### Setup

Switch to the project root directory and run the `setup.sh` script (`setup.bat` for Windows):
```bash
$ cd application.name
$ ./bin/setup.sh
```

### Workflow
The `grunt serve` (watch, livereload) loop is designed to accelerate development workflow:
```bash
$ grunt serve:dev
```

Alternatively, to simply run the application in standalone-mode, invoke the following:
``bash
$ grunt serve
```

Environment-based config parameters are stored in `conf`, to switch between them invoke the following:
``bash
$ grunt --env=conf\dev.json serve
```

Directory Structure
-------------------
<pre>
/
|-- bower.json: runtime dependencies (backbone, bootstrap, handlebars)
|-- package.json: development dependencies (grunt plugins)
|-- Gruntfile.js: all grunt build, deploy, compile, serve tasks
|-- conf: environment-specific configuration settings
|-- dist: deployment-ready application assets
|-- src: application source code
    |-- index.jade
    |-- images (image assets)
    |-- sass (sass stylesheet assets)
    |-- scripts (javascript assets)
        |-- app.js (namespace declaration)
        |-- bootstrap.js (application setup)
        |-- manager.js (application view)
        |-- master.js (application router)
        |-- mixins (application mixins)
        |-- views (backbone views)
        |-- models (backbone models)
        |-- collections (backbone collections)
        |-- handlebars (handlebars helpers)
        |-- templates (handlebars templates)
</pre>

Future Considerations
---------------------
* [ ] Add Test Framework Integration
* [ ] Yeoman-based Generator

License
-------
Released under the MIT License.  See the LICENSE file for further details.
