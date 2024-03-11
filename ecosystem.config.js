module.exports = {
  apps: [
    {
      name: 'dmv-telegram-bot',
      script: 'dist/main.js',
      // script : "node_modules/@nestjs/cli/bin/nest.js",
      // args: "start --watch",
      // instances: 'max',
      // exec_mode: 'cluster',
    },
  ],
};
