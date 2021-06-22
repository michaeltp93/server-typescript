export default {
  client: 'mysql',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: ['.ts'],
  },
};
