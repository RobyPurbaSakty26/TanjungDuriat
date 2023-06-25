const transactionService = require("../../../service/transactionService");
const transactionController = require("./transactionController");

/* eslint-disable no-undef */
jest.mock("../../../service/transactionService");

describe("handllerCreateTransaction", () => {
  test("should return success status", async () => {
    const mockRequestBody = {
      id: 1,
      idWahana: 2,
      paketId: 1,
      countTiket: 3,
    };
    const mockCreatedTransaction = {
      // Mock created transaction data
    };

    jest
      .spyOn(transactionService, "create")
      .mockResolvedValue(mockCreatedTransaction);

    const mockReq = {
      user: {
        Role: "Admin Wahana",
      },
      body: mockRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.handllerCreateTransaction(mockReq, mockRes);

    // expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Created",
      data: mockCreatedTransaction,
    });
  });

  test("should return status 203 and an error message when user is not an admin Wahana", async () => {
    const mockUserId = 1;
    const mockRole = "Bukan admin";
    const mockRequestBody = {
      // Mock request body
    };
    const errorMessage = "Kamu bukan admin Wahana";

    const mockReq = {
      user: {
        id: mockUserId,
        Role: mockRole,
      },
      body: mockRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.handllerCreateTransaction(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(203);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });

  test("should return status 401 and an error message when the request body is incomplete", async () => {
    const mockUserId = "validUserId";
    const mockRole = "Admin Wahana";
    const mockIncompleteRequestBody = {
      // Mock incomplete request body
    };
    const errorMessage = "Request tidak lengkap";

    const mockReq = {
      user: {
        id: mockUserId,
        Role: mockRole,
      },
      body: mockIncompleteRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.handllerCreateTransaction(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });

  test("should return status 404 and an error message when create function throws an error", async () => {
    const mockUserId = "validUserId";
    const mockRole = "Admin Wahana";
    const mockRequestBody = {
      id: 1,
      idWahana: 2,
      paketId: 1,
      countTiket: 3,
    };
    const errorMessage = "error";

    jest
      .spyOn(transactionService, "create")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {
      user: {
        id: mockUserId,
        Role: mockRole,
      },
      body: mockRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.handllerCreateTransaction(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerGetByDateTransaction", () => {
  test("should return status 200 and the transaction data when input is complete", async () => {
    const mockFromDate = "2023-06-01";
    const mockToDate = "2023-06-30";
    const mockTransactionData = [
      // Mock transaction data
    ];

    jest
      .spyOn(transactionService, "getByDate")
      .mockResolvedValue(mockTransactionData);

    const mockReq = {
      body: {
        from: mockFromDate,
        to: mockToDate,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.getByDate(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockTransactionData,
    });
  });

  test("should return status 401 and an error message when input is incomplete", async () => {
    const errorMessage = "Input tidak lengkap";

    const mockReq = {
      body: {
        // Incomplete input
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.getByDate(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });

  test("should return status 404 and an error message when getByDate function throws an error", async () => {
    const mockFromDate = "2023-06-01";
    const mockToDate = "2023-06-30";
    const errorMessage = "Some error occurred";

    jest
      .spyOn(transactionService, "getByDate")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {
      body: {
        from: mockFromDate,
        to: mockToDate,
      },
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await transactionController.getByDate(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});
