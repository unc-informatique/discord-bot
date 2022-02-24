/* eslint-disable unicorn/prefer-module */
/**
 * @file Configuration for the pm2 process manager
 * @author Romuald THION
 *
 * https://stackoverflow.com/questions/45887206/using-pm2-to-do-yarn-start-gives-error-while-npm-start-works-fine
 *
 * utiliser pm2 en global, pas en npx
 */

module.exports = {
  apps: [
    {
      name: "mini-bot",
      // pb avec yarn : c'est qu'on monitor le process de yarn !
      script: "main.mjs",
      interpreter: "node",
      cwd: ".",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: false,
      watch: ["*.mjs"],
      ignore_watch: ["logs/"],
      restart_delay: 1000,
      watch_delay: 1000,
      kill_timeout: 3000,
      max_memory_restart: "512M",
      // /!\ logging (async / sync) pino KO en cluster /!\
      exec_mode: "fork",
      merge_logs: true,
      wait_ready: true,
      listen_timeout: 3000,
    },
  ],
};
