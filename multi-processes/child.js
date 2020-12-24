// const spawn = require('child_process').spawn;
// let ls = spawn('ipconfig');
// ls.stdout.on('readable', function() {
//     let d = this.read();
//     d && console.log(d.toString());
// });
// ls.on('close', code => {
//     console.log(`child process exited with code: ${code}`);
// });
//
// process.stdout.write(Buffer.from("Hello!"));

// const fork = require('child_process').fork;
// fork('./emitter.js');
// fork('./emitter.js');
// fork('./emitter.js');

// child.js
process.on('message', msgobj => {
    console.log('Child got message:', msgobj.text);
    process.send({
        text: `${msgobj.text} too`
    });
});