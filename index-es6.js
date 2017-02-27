'use strict';

module.exports = (task) => {
  return function() {
    const archy = require('archy');
    const tree = { label: 'gulp', nodes: [] };
    const tasks = require('gulp/lib/taskTree')(this.tasks);
    const nodesList = {};

    tasks.nodes.forEach(({label}) =>
      tree.nodes.push(nodesList[label] = { label: label, nodes: [] })
    );

    tasks.nodes.forEach(({ label, nodes }) =>
      nodes.forEach(dep => nodesList[label].nodes.push(nodesList[dep]))
    );

    const sortByLabel = (n1, n2) => n1.label.localeCompare(n2.label);
    const sortNodes = (label, nodes) => {
      nodes.sort(sortByLabel);
      nodes.forEach((item, index) => {
        if (item) {
          let nodes = item.nodes;
          return sortNodes(item.label, nodes)
        }
        else {
          let missingTask = this.tasks[label].dep[index];
          throw new Error('There is a missing task in the gulp file. `' + label + '` depends on `' + missingTask + '` but `' + missingTask + '` is not found.');
        }
      });
    };

    try {
      sortNodes('gulp', tree.nodes);
      console.log(archy(nodesList[task] || tree));
    }
    catch (e) {
      if (e instanceof RangeError) {
        throw new TypeError('There is a cyclic dependency in the tasks tree');
      }
      else {
        throw e;
      }
    }
  };
};
