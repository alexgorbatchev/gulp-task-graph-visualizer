const chai = require('chai');
const expect = chai.expect;

const viz = require('../index');

describe('gulp-task-graph-visualizer', function() {
	it('should render a valid task tree correctly', function() {
		//Prepare
		//Hijacking console.log to get the result
		const real_console_log = console.log;
		var out = [];
		console.log = function(...args) {
			out.push(args.join(' '))
		};
		
		const tasks = {
			a: { name: 'a', dep: [], },
			b: { name: 'b', dep: [ 'a' ], },
			c: { name: 'c', dep: [ 'b' ], },
			d: { name: 'd', dep: [ 'c' ], },
			e: { name: 'e', dep: [], },
			'default': { name: 'default', dep: [ 'd', 'e' ], },
		};
		
		//Execute
		viz().call({ tasks });
					
		//Verify
		real_console_log(out.join("\n"));
		expect(out.join("\n")).to.be.eq([
			"gulp",
			"├── a",
			"├─┬ b",
			"│ └── a",
			"├─┬ c",
			"│ └─┬ b",
			"│   └── a",
			"├─┬ d",
			"│ └─┬ c",
			"│   └─┬ b",
			"│     └── a",
			"├─┬ default",
			"│ ├─┬ d",
			"│ │ └─┬ c",
			"│ │   └─┬ b",
			"│ │     └── a",
			"│ └── e",
			"└── e",
			""
		].join("\n"));
		
		//Release
		console.log = real_console_log;
	});
	
	it('should show an error if cyclic dependencies are found', function() {
		//Prepare
		const tasks = {
			a: { name: 'a', dep: [ 'b' ], },
			b: { name: 'b', dep: [ 'a' ], },
		};
		
		//Execute
		var output = () => viz().call({ tasks });
		
		//Verify
		expect(output).to.throw(TypeError, /cyclic dependenc(y|ies)/);
	});
	
	
});