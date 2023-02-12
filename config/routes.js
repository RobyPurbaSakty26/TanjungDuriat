const express = require("express");
const controllers = require("../app/controllers");
// const swaggerUI = require('swagger-ui-express');
// const swgDoc = require('../doc/OBYKAO26_1-template-1.0.0-resolved.json');
// const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

apiRouter.get("/", controllers.api.main.handleGetRoot);

// users
apiRouter.post(
  "/api/v1/users",
  controllers.api.v1.userContriller.hadnleCreateUser
);

apiRouter.get(
  "/api/v1/users",
  controllers.api.v1.userContriller.handleGetAllUsers
);

apiRouter.post("/api/v1/login", controllers.api.v1.userContriller.handleLogin);

// wahana
apiRouter.get(
  "/api/v1/wahana",
  controllers.api.v1.wahanaContriller.handleGetAllWahana
);
apiRouter.post(
  "/api/v1/wahana",
  controllers.api.v1.wahanaContriller.handleCreateWahana
);
apiRouter.put(
  "/api/v1/wahana/:id",
  controllers.api.v1.wahanaContriller.handleUpdateWahana
);
apiRouter.get(
  "/api/v1/wahana/:id",
  controllers.api.v1.wahanaContriller.handleGetByPkWahana
);
apiRouter.delete(
  "/api/v1/wahana/:id",
  controllers.api.v1.wahanaContriller.handleDeleteWahana
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
