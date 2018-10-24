import Hapi from 'hapi';
import mongoose from 'mongoose';
import getPlugins from './plugins';
import getConfig from './config/default';

const config = getConfig();
const {
  mongoDbHost,
  mongoDbUser,
  mongoDbPass,
  mongoDbName
} = config.server;

if (mongoDbUser && mongoDbPass) {
  mongoose.connect(
    `mongodb://${mongoDbUser}:${mongoDbPass}@${mongoDbHost}/${mongoDbName}`,
    { useNewUrlParser: true }
  );
} else {
  mongoose.connect(
    `mongodb://${mongoDbHost}/${mongoDbName}`,
    { useNewUrlParser: true }
  );
}

const db = mongoose.connection;

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.serviceHost
  });

  if (config.useMocks) {
  	require('./mock/mock'); // eslint-disable-line
  }

  const plugins = getPlugins(config);
  await server.register(plugins);
  await server.start();
  console.log(`Server is running at: ${server.info.uri}`); // eslint-disable-line
  console.log(`Config: ${JSON.stringify(config)}`); // eslint-disable-line
};

process.on('unhandledRejection', (err) => {
  console.error(err); // eslint-disable-line
  process.exit(1);
});

db.on('error', (e) => {
  console.error('MongoDB connection error: ', e); // eslint-disable-line
});

db.once('open', () => {
  console.log('MongoDB connection success'); // eslint-disable-line
  init();
});
