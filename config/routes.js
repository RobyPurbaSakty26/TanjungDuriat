const express = require("express");
const controllers = require("../app/controllers");
// const swaggerUI = require('swagger-ui-express');
// const swgDoc = require('../doc/OBYKAO26_1-template-1.0.0-resolved.json');
// const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

apiRouter.get("/", controllers.api.main.handleGetRoot);

// users
apiRouter.post(
  "/api/v1/register-admin-wahana",
  controllers.api.v1.authContriller.hadnleCreateUserAdminWahana
);
apiRouter.post(
  "/api/v1/register-admin-keuangan",
  controllers.api.v1.authContriller.hadnleCreateUserAdminKeuangan
);
apiRouter.get(
  "/api/v1/whoim",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.whoIm
);
apiRouter.get(
  "/api/v1/users",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.authContriller.handleGetAllUsers
);
apiRouter.post("/api/v1/login", controllers.api.v1.authContriller.handleLogin);

apiRouter.put(
  "/api/v1/users/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.usersCotroller.handleUpdateUser
);
apiRouter.delete(
  "/api/v1/users/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.usersCotroller.handleDeleteUser
);
apiRouter.get(
  "/api/v1/users/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.usersCotroller.handleGetByPkUser
);

// wahana
apiRouter.get(
  "/api/v1/wahana",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.wahanaContriller.handleGetAllWahana
);
apiRouter.post(
  "/api/v1/wahana",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.wahanaContriller.handleCreateWahana
);
apiRouter.put(
  "/api/v1/wahana/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.wahanaContriller.handleUpdateWahana
);
apiRouter.get(
  "/api/v1/wahana/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.wahanaContriller.handleGetByPkWahana
);
apiRouter.delete(
  "/api/v1/wahana/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.wahanaContriller.handleDeleteWahana
);

// paket
apiRouter.post(
  "/api/v1/paket",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.paketCotroller.handlerCreatePaket
);
apiRouter.get(
  "/api/v1/paket",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.paketCotroller.handlerGetAllPaket
);
apiRouter.get(
  "/api/v1/paket/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.paketCotroller.handlerGetByPkPaket
);
apiRouter.put(
  "/api/v1/paket/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.paketCotroller.handlerUpdatePaket
);
apiRouter.delete(
  "/api/v1/paket/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.paketCotroller.handlerDeletePaket
);

// pengeluaran
apiRouter.post(
  "/api/v1/pengeluaran",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pengeluaranController.handlerCreatePengeluaran
);
apiRouter.get(
  "/api/v1/pengeluaran",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pengeluaranController.handlerGetAllPengeluaran
);
apiRouter.get(
  "/api/v1/pengeluaran/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pengeluaranController.handlerGetByPkPengeluaran
);
// apiRouter.put(
//   "/api/v1/pengeluaran/:id",
//   controllers.api.v1.pengeluaranController.handlerUpdatePengeluaran
// );
// apiRouter.delete(
//   "/api/v1/pengeluaran/:id",
//   controllers.api.v1.pengeluaranController.handlerDeletePengeluaran
// );

// pemasukan
apiRouter.get(
  "/api/v1/pemasukan",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pemasukanContriller.handlerGetAllPemasukan
);
apiRouter.get(
  "/api/v1/pemasukan/:id",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pemasukanContriller.handlerGetByPkPemasukan
);
apiRouter.post(
  "/api/v1/pemasukan",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.pemasukanContriller.handlerCreatePemasukan
);
// apiRouter.put(
//   "/api/v1/pemasukan/:id",
//   controllers.api.v1.pemasukanContriller.handlerUpdatePemasukan
// );
// apiRouter.delete(
//   "/api/v1/pemasukan/:id",
//   controllers.api.v1.pemasukanContriller.handlerDeletePemasukan
// );

// transaction
apiRouter.post(
  "/api/v1/transaction",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsAdminKeuangan,
  controllers.api.v1.transactionController.handllerCreateTransaction
);
apiRouter.get(
  "/api/v1/transaction",
  controllers.api.v1.transactionController.getByDate
);
// apiRouter.get(
//   "/api/v1/transaction/last",
//   controllers.api.v1.transactionController.lastTransaction
// );
// apiRouter.get(
//   "/api/v1/transaction/saldo",
//   controllers.api.v1.transactionController.total
// );

// mutasi
apiRouter.get(
  "/api/v1/mutasi",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsManagerOrAminKeuangan,
  controllers.api.v1.mutasiContoller.handlerGettAllMutasi
);
apiRouter.get(
  "/api/v1/mutasi/get-by-date",
  controllers.api.v1.authContriller.handleAuthorize,
  controllers.api.v1.authContriller.middlewareIsManagerOrAminKeuangan,
  controllers.api.v1.mutasiContoller.handllerGetByDateMutasi
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
