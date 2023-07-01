const pengeluaranService = require("../../../service/pengeluaranService");
const validatePengeluaran = require("./helpers/validatePengeluaran");
const pengeluaranController = require("./pengeluaranController");

/* eslint-disable no-undef */
jest.mock("../../../service/pengeluaranService");
jest.mock("./helpers/validatePengeluaran");

describe("handllerCreatePengeluaran", () => {
  test("should return status 201 and data saving to database", async () => {
    const req = {
      body: {
        Count: 1,
        Description: "Pengeluaran bulanan",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockPengeluaran = {
      Count: 1,
      Description: "Pengeluaran bulanan",
    };

    pengeluaranService.create.mockResolvedValue({
      Count: 1,
      Description: "Pengeluaran bulanan",
    });

    await pengeluaranController.handlerCreatePengeluaran(req, res);
    expect(validatePengeluaran.validateCreatePengeluaran).toHaveBeenCalledWith(
      req.body
    );
    expect(pengeluaranService.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockPengeluaran,
    });
  });

  test("should return 400 status code with error message when validation fails", async () => {
    const req = {
      body: {
        // Mock the request body
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const validationError = new Error("Validation error");
    validatePengeluaran.validateCreatePengeluaran.mockImplementation(() => {
      throw validationError;
    });

    await pengeluaranController.handlerCreatePengeluaran(req, res);

    expect(validatePengeluaran.validateCreatePengeluaran).toHaveBeenCalledWith(
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: validationError.message,
    });
  });

  it("should return 400 status code with error message when pengeluaranService throws an error", async () => {
    const req = {
      body: {
        Count: 1,
        Description: "Pengeluaran bulanan",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    validatePengeluaran.validateCreatePengeluaran.mockImplementation(() => {
      true;
    });

    pengeluaranService.create.mockRejectedValue(new Error("error"));

    await pengeluaranController.handlerCreatePengeluaran(req, res);

    expect(validatePengeluaran.validateCreatePengeluaran).toHaveBeenCalledWith(
      req.body
    );

    expect(pengeluaranService.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "error",
    });
  });
});

describe("handllerGetAllPengeluaran", () => {
  test("should return all pengeluaran with 200 status code", async () => {
    const mockPengeluaran = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];
    const mockCount = 2;
    pengeluaranService.getAll.mockResolvedValue({
      data: mockPengeluaran,
      count: mockCount,
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pengeluaranController.handlerGetAllPengeluaran(req, res);
    expect(pengeluaranService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockPengeluaran,
      count: mockCount,
    });
  });

  test("should return 400 status code with error message when pengeluaranService throws an error", async () => {
    const serviceError = new Error("Service error");
    pengeluaranService.getAll.mockRejectedValue(serviceError);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pengeluaranController.handlerGetAllPengeluaran(req, res);
    expect(pengeluaranService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: serviceError.message,
    });
  });
});

describe("handllerGetByPk", () => {
  test("should return the pengeluaran with the specified ID and status code 200", async () => {
    const mockPengeluaran = { id: 1, amount: 100 };
    pengeluaranService.getByPk.mockResolvedValue(mockPengeluaran);

    const req = {
      params: {
        id: 1, // Mock the ID parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pengeluaranController.handlerGetByPkPengeluaran(req, res);
    expect(pengeluaranService.getByPk).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockPengeluaran,
    });
  });

  it("should return a 404 status code with an error message when the pengeluaran is not found", async () => {
    pengeluaranService.getByPk.mockResolvedValue(null);

    const req = {
      params: {
        id: 1, // Mock the ID parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pengeluaranController.handlerGetByPkPengeluaran(req, res);
    expect(pengeluaranService.getByPk).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Data tidak ditemukan",
    });
  });

  test("should return a 400 status code with an error message when pengeluaranService throws an error", async () => {
    const serviceError = new Error("Service error");
    pengeluaranService.getByPk.mockRejectedValue(serviceError);

    const req = {
      params: {
        id: 1, // Mock the ID parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pengeluaranController.handlerGetByPkPengeluaran(req, res);
    expect(pengeluaranService.getByPk).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: serviceError.message,
    });
  });
});
