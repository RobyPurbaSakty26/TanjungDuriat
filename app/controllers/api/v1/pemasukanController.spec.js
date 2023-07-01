const pemasukanService = require("../../../service/pemeasukanService");
const validatePemasukan = require("./helpers/validatePemasukan");
const pemasukanController = require("./pemasukanController");

/* eslint-disable no-undef */
jest.mock("../../../service/pemeasukanService");
jest.mock("./helpers/validatePemasukan");

describe("handllerGetAll", () => {
  test("should return 200 status and lis pengeluaran", async () => {
    const mockPemasukan = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];
    const mockCount = 2;

    pemasukanService.getAll.mockResolvedValue({
      data: mockPemasukan,
      count: mockCount,
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerGetAllPemasukan(req, res);

    expect(pemasukanService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockPemasukan,
      count: mockCount,
    });
  });

  test("should return 400 status code with error message when pemasukanService throws an error", async () => {
    const serviceError = new Error("Service error");
    pemasukanService.getAll.mockRejectedValue(serviceError);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerGetAllPemasukan(req, res);

    expect(pemasukanService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: serviceError.message,
    });
  });
});

describe("handllerGetByPk", () => {
  it("should return the pemasukan with the specified ID and status code 200", async () => {
    const mockId = 1;
    const mockPemasukan = {
      id: 11,
      idUser: 1,
      FromDate: "2023-06-24T00:00:00.000Z",
      ToDate: "2023-06-25T16:59:59.000Z",
      Count: 40000,
      Keterangan: "none k",
      createdAt: "2023-06-25T16:48:50.486Z",
      updatedAt: "2023-06-25T16:48:50.486Z",
    };
    pemasukanService.getByPk.mockResolvedValue(mockPemasukan);

    const req = {
      params: {
        id: mockId, // Mock the ID parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await pemasukanController.handlerGetByPkPemasukan(req, res);

    expect(pemasukanService.getByPk).toHaveBeenCalledWith(mockId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockPemasukan,
    });
  });

  it("should return a 404 status code with an error message when the ID parameter is missing", async () => {
    const req = {
      params: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerGetByPkPemasukan(req, res);
    expect(pemasukanService.getByPk).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Data tidak ditemukan",
    });
  });

  it("should return a 400 status code with an error message when pemasukanService throws an error", async () => {
    const mockId = 1;
    const serviceError = new Error("Service error");
    pemasukanService.getByPk.mockRejectedValue(serviceError);

    const req = {
      params: {
        id: mockId, // Mock the ID parameter
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerGetByPkPemasukan(req, res);

    expect(pemasukanService.getByPk).toHaveBeenCalledWith(mockId);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: serviceError.message,
    });
  });
});

describe("handllerCreatePemasukan", () => {
  test("should create a new pemasukan and return it with a 200 status code", async () => {
    const mockRequestBody = {
      amount: 100,
      from: "2023-06-26",
      to: "2023-06-27",
    };
    const mockCreatedPemasukan = {
      id: 1,
      amount: 100,
      from: new Date("2023-06-26"),
      to: new Date("2023-06-27T23:59:59"),
      idUser: "user-id",
    };

    validatePemasukan.validatePemasukanCreate.mockReturnValue(); // Mock the validation function
    pemasukanService.create.mockResolvedValue(mockCreatedPemasukan); // Mock the create method of pemasukanService

    const req = {
      body: mockRequestBody,
      user: {
        id: "user-id",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerCreatePemasukan(req, res);

    expect(validatePemasukan.validatePemasukanCreate).toHaveBeenCalledWith(
      mockRequestBody
    );
    expect(pemasukanService.create).toHaveBeenCalledWith({
      ...mockRequestBody,
      idUser: "user-id",
      from: new Date("2023-06-26"),
      to: new Date("2023-06-27T23:59:59"),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockCreatedPemasukan,
    });
  });

  it("should return a 400 status code with an error message when validation fails", async () => {
    const validationError = new Error("Validation error");
    validatePemasukan.validatePemasukanCreate.mockImplementation(() => {
      throw validationError;
    });

    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await pemasukanController.handlerCreatePemasukan(req, res);
    expect(validatePemasukan.validatePemasukanCreate).toHaveBeenCalled();
    expect(pemasukanService.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: validationError.message,
    });
  });

  it("should return a 400 status code with an error message when pemasukanService.create throws an error", async () => {
    const mockRequestBody = {
      amount: 100,
      from: "2023-06-26",
      to: "2023-06-27",
    };
    const serviceError = new Error("Service error");

    validatePemasukan.validatePemasukanCreate.mockReturnValue(); // Mock the validation function
    pemasukanService.create.mockRejectedValue(serviceError);

    const req = {
      body: mockRequestBody,
      user: {
        id: "user-id",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await pemasukanController.handlerCreatePemasukan(req, res);

    expect(validatePemasukan.validatePemasukanCreate).toHaveBeenCalledWith(
      mockRequestBody
    );
    expect(pemasukanService.create).toHaveBeenCalledWith({
      ...mockRequestBody,
      idUser: "user-id",
      from: new Date("2023-06-26"),
      to: new Date("2023-06-27T23:59:59"),
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "Fail",
      message: serviceError.message,
    });
  });
});
