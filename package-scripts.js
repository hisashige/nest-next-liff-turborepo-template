const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const manageWebPath = path.resolve(__dirname, "apps/manage-web");
const liffPath = path.resolve(__dirname, "apps/liff");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciManageWebPath = path.resolve(__dirname, "out/apps/manage-web");
const ciLiffPath = path.resolve(__dirname, "out/apps/liff");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.yarn prepare.api`,
      yarn: `yarn`,
      api: `nps prepare.docker prisma.migrate.dev`,
      docker: "docker compose up -d",
      ci: {
        manageWeb: `npx turbo prune --scope=manage-web && cd out && yarn install --frozen-lockfile`,
        liff: `npx turbo prune --scope=liff && cd out && yarn install --frozen-lockfile`,
        api: `npx turbo prune --scope=api && cd out && yarn install --frozen-lockfile && nps prisma.generate`,
      },
    },
    test: {
      default: `nps test.manageWeb test.api`,
      manageWeb: `cd ${manageWebPath} && yarn test`,
      liff: `cd ${liffPath} && yarn test`,
      api: `cd ${apiPath} && yarn test`,
      ci: {
        default: `nps test.ci.manageWeb test.ci.api`,
        manageWeb: `cd ${ciManageWebPath} && yarn test:ci`,
        liff: `cd ${ciLiffPath} && yarn test:ci`,
        api: `cd ${ciApiPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.manageWeb test.watch.liff test.watch.api`,
        manageWeb: `cd ${manageWebPath} && yarn test:watch`,
        liff: `cd ${liffPath} && yarn test:watch`,
        api: `cd ${apiPath} && yarn test:watch`,
      },
    },
    prisma: {
      generate: `cd ${apiPath} && npx prisma generate`,
      studio: `cd ${apiPath} && npx prisma studio`,
      migrate: {
        dev: `cd ${apiPath} && npx prisma migrate dev`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        manageWeb: "cd out && npm run build",
        liff: "cd out && npm run build",
        api: "cd out && npm run build",
      },
    },
    docker: {
      reload: {
        nginx: "docker exec nginx_container nginx -s reload",
      },
      build: {
        default: "nps docker.build.manageWeb docker.build.liff docker.build.api",
        manageWeb: `docker build -t manageWeb . -f ${manageWebPath}/Dockerfile`,
        liff: `docker build -t liff . -f ${liffPath}/Dockerfile`,
        api: `docker build -t api . -f ${apiPath}/Dockerfile`,
      },
    },
    dev: "npx turbo run dev",
  },
};
