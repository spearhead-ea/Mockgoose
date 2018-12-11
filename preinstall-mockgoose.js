var mongoose = require('mongoose');
let {Mockgoose} = require('./built/mockgoose');
const mockgoose = new Mockgoose(mongoose);
const DbVersion = process.argv[2] || '3.2.21';
console.log(`Mockgoose version setting is [${DbVersion}]`);

mockgoose.helper.setDbVersion(DbVersion);

async function preinstall() {
  await mockgoose.prepareStorage();
  await new Promise(resolve => mockgoose.helper.reset().then(() => resolve()));
  await new Promise(resolve => mongoose.disconnect(resolve));
  await mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
}

preinstall();

