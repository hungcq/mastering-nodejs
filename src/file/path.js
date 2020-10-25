const path = require('path');
const fs = require('fs');

path.normalize("../one////two/./three.html");
// -> ../one/two/three.html

path.join("../", "one", "two", "three.html");
// -> ../one/two/three.html

path.dirname("../one/two/three.html");
// ../one/two

path.basename("../one/two/three.html");
// -> three.html
// Remove file extension from the basename
path.basename("../one/two/three.html", ".html");
// -> three

var pstring = "../one/two/three.html";
path.extname(pstring);
// -> .html

path.relative(
  '/one/two/three/four',
  '/one/two/thumb/war'
);
// -> ../../thumb/war

path.resolve('/one/two', '/three/four');
// -> /three/four
path.resolve('/one/two/three', '../', 'four', '../../five')
// -> /one/five

path.resolve('one', 'two/three', 'four');
// -> /users/home/john/one/two/three/four

console.log(path.resolve('path.js', '../../async/promise.js'));

fs.realpath('path.js', (err, resolvedPath) => {
  console.log(resolvedPath); // `/real/path/to/file.txt`
});