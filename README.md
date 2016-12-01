# gulp-task-graph-visualizer

[![GratiPay](https://img.shields.io/gratipay/user/alexgorbatchev.svg)](https://gratipay.com/alexgorbatchev/)
![Downloads](https://img.shields.io/npm/dm/gulp-task-graph-visualizer.svg)
![Version](https://img.shields.io/npm/v/gulp-task-graph-visualizer.svg)

Gulp.js plugin to visualize task dependency graph within your gulpfile.

## Installation

```
npm install --save-dev gulp-task-graph-visualizer
```

## Usage

In your gulpfile:

```js
gulp.task('viz', require('gulp-task-graph-visualizer')());
```

Then simply run `gulp viz` and it will print out something like this:

```
gulp
├─┬ build
│ ├─┬ build:app
│ │ ├─┬ build:dev
│ │ │ └─┬ build:vendor
│ │ │   └─┬ build:typescript
│ │ │     └── build:static
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ └─┬ build:index
│   ├─┬ build:app
│   │ ├─┬ build:dev
│   │ │ └─┬ build:vendor
│   │ │   └─┬ build:typescript
│   │ │     └── build:static
│   │ └─┬ build:vendor
│   │   └─┬ build:typescript
│   │     └── build:static
│   └── build:static
├─┬ build:app
│ ├─┬ build:dev
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ └─┬ build:vendor
│   └─┬ build:typescript
│     └── build:static
├── build:clean
├─┬ build:dev
│ └─┬ build:vendor
│   └─┬ build:typescript
│     └── build:static
├─┬ build:index
│ ├─┬ build:app
│ │ ├─┬ build:dev
│ │ │ └─┬ build:vendor
│ │ │   └─┬ build:typescript
│ │ │     └── build:static
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ └── build:static
├── build:static
├─┬ build:test
│ ├─┬ build:dev
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ └─┬ build:vendor
│   └─┬ build:typescript
│     └── build:static
├─┬ build:typescript
│ └── build:static
├─┬ build:vendor
│ └─┬ build:typescript
│   └── build:static
├─┬ dev
│ ├─┬ build:typescript
│ │ └── build:static
│ ├─┬ dev:server
│ │ ├─┬ build:dev
│ │ │ └─┬ build:vendor
│ │ │   └─┬ build:typescript
│ │ │     └── build:static
│ │ ├─┬ build:index
│ │ │ ├─┬ build:app
│ │ │ │ ├─┬ build:dev
│ │ │ │ │ └─┬ build:vendor
│ │ │ │ │   └─┬ build:typescript
│ │ │ │ │     └── build:static
│ │ │ │ └─┬ build:vendor
│ │ │ │   └─┬ build:typescript
│ │ │ │     └── build:static
│ │ │ └── build:static
│ │ ├── build:static
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ └── format:typescript
├─┬ dev:server
│ ├─┬ build:dev
│ │ └─┬ build:vendor
│ │   └─┬ build:typescript
│ │     └── build:static
│ ├─┬ build:index
│ │ ├─┬ build:app
│ │ │ ├─┬ build:dev
│ │ │ │ └─┬ build:vendor
│ │ │ │   └─┬ build:typescript
│ │ │ │     └── build:static
│ │ │ └─┬ build:vendor
│ │ │   └─┬ build:typescript
│ │ │     └── build:static
│ │ └── build:static
│ ├── build:static
│ └─┬ build:vendor
│   └─┬ build:typescript
│     └── build:static
├── format:typescript
├─┬ karma
│ └─┬ build:test
│   ├─┬ build:dev
│   │ └─┬ build:vendor
│   │   └─┬ build:typescript
│   │     └── build:static
│   └─┬ build:vendor
│     └─┬ build:typescript
│       └── build:static
├─┬ test:mocha
│ └─┬ build:typescript
│   └── build:static
└── viz
```

You can also limit the output by passing specific task name:

```js
import yargz from 'yargs';
gulp.task('viz', require('gulp-task-graph-visualizer')(yargs.argv.task));
```

Then running `gulp viz --task=karma` would produce a more narrow output:

```
karma
└─┬ build:test
  ├─┬ build:dev
  │ └─┬ build:vendor
  │   └─┬ build:typescript
  │     └── build:static
  └─┬ build:vendor
    └─┬ build:typescript
      └── build:static
```

## License

MIT
