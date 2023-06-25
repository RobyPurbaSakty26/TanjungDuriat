const wahanaService = require("../../../service/wahanaService");
const wahanaController = require("./wahanaController");

/* eslint-disable no-undef */
jest.mock("../../../service/wahanaService");

describe("handllerDeleteWahana", () => {
  test("should return delete wahana success", async () => {
    const mockReq = {
      params: {
        id: "validId",
      },
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    const mockWahana = { id: "validId", name: "Wahana A" };
    wahanaService.findByPk.mockResolvedValue(mockWahana);
    jest.spyOn(wahanaService, "delete").mockResolvedValue();

    await wahanaController.handleDeleteWahana(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      message: "Data berhasil dihapus",
    });
  });

  test("should return status 401 and an error message when invalid ID is provided", async () => {
    const mockReq = {
      params: {
        id: "invalidId",
      },
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
    jest.spyOn(wahanaService, "findByPk").mockResolvedValue(null);

    await wahanaController.handleDeleteWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith("invalidId");
    expect(wahanaService.delete).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Data tidak ditemukan",
    });
  });

  test("should return status 401 and an error message when an exception is thrown", async () => {
    const mockReq = {
      params: {
        id: "validId",
      },
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    const mockWahana = { id: "validId", name: "Wahana A" };
    jest.spyOn(wahanaService, "findByPk").mockResolvedValue(mockWahana);
    jest
      .spyOn(wahanaService, "delete")
      .mockRejectedValue(new Error("Some error occurred"));

    await wahanaController.handleDeleteWahana(mockReq, mockRes);
    expect(wahanaService.findByPk).toHaveBeenCalledWith("validId");
    expect(wahanaService.delete).toHaveBeenCalledWith("validId");
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Some error occurred",
    });
  });
});

describe("handllerGetWahana", () => {
  test("should return status 201 and data when getAll function is successful", async () => {
    const mockData = [
      { id: 1, name: "Wahana A" },
      { id: 2, name: "Wahana B" },
    ];
    const mockCount = 2;

    jest
      .spyOn(wahanaService, "getAll")
      .mockResolvedValue({ data: mockData, count: mockCount });

    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
    await wahanaController.handleGetAllWahana(mockReq, mockRes);

    expect(wahanaService.getAll).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockData,
      count: mockCount,
    });
  });

  test("should return status 401 and an error message when getAll function throws an error", async () => {
    const err = "Error";

    jest.spyOn(wahanaService, "getAll").mockRejectedValue(new Error(err));

    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetAllWahana(mockReq, mockRes);
    expect(wahanaService.getAll).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: err,
    });
  });
});

describe("handllerCreateWahana", () => {
  test("should return status 201 and data when getAll function is successful", async () => {
    const mockData = [
      { id: 1, name: "Wahana A" },
      { id: 2, name: "Wahana B" },
    ];
    const mockCount = 2;

    jest
      .spyOn(wahanaService, "getAll")
      .mockResolvedValue({ data: mockData, count: mockCount });

    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetAllWahana(mockReq, mockRes);
    expect(wahanaService.getAll).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockData,
      count: mockCount,
    });
  });

  test("should return status 401 and an error message when getAll function throws an error", async () => {
    const errorMessage = "Some error occurred";

    jest
      .spyOn(wahanaService, "getAll")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetAllWahana(mockReq, mockRes);

    expect(wahanaService.getAll).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerCreateteWahana", () => {
  test("should return status 201 and the created data when create function is successful", async () => {
    const mockRequestBody = { name: "Wahana A", description: "Description A" };
    const mockCreatedWahana = {
      id: 1,
      name: "Wahana A",
      description: "Description A",
    };

    jest.spyOn(wahanaService, "create").mockResolvedValue(mockCreatedWahana);

    const mockReq = {
      body: mockRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleCreateWahana(mockReq, mockRes);

    expect(wahanaService.create).toHaveBeenCalledWith(mockRequestBody);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockCreatedWahana,
    });
  });

  test("should return status 401 and an error message when create function throws an error", async () => {
    const errorMessage = "Some error occurred";

    jest
      .spyOn(wahanaService, "create")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {
      body: { name: "Wahana A", description: "Description A" },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleCreateWahana(mockReq, mockRes);
    expect(wahanaService.create).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerUpdateWahana", () => {
  test("should return status 200 and a success message when valid ID and body are provided", async () => {
    const mockId = "validId";
    const mockRequestBody = {
      name: "Updated Wahana A",
      description: "Updated Description A",
    };

    jest.spyOn(wahanaService, "findByPk").mockResolvedValue({
      id: mockId,
      name: "Wahana A",
      description: "Description A",
    });
    jest.spyOn(wahanaService, "update").mockResolvedValue();

    const mockReq = {
      params: {
        id: mockId,
      },
      body: mockRequestBody,
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
    await wahanaController.handleUpdateWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockId);
    expect(wahanaService.update).toHaveBeenCalledWith(mockId, mockRequestBody);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      message: "Data berhasil diupdate",
    });
  });

  test("should return status 401 and an error message when invalid ID is provided", async () => {
    const mockInvalidId = "invalidId";

    jest.spyOn(wahanaService, "findByPk").mockResolvedValue(null);

    const mockReq = {
      params: {
        id: mockInvalidId,
      },
      body: { name: "Updated Wahana A", description: "Updated Description A" },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleUpdateWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockInvalidId);
    expect(wahanaService.update).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "ID tidak ditemukan",
    });
  });

  test("should return status 401 and an error message when update function throws an error", async () => {
    const mockId = "validId";
    const mockRequestBody = {
      name: "Updated Wahana A",
      description: "Updated Description A",
    };
    const errorMessage = "Some error occurred";

    jest.spyOn(wahanaService, "findByPk").mockResolvedValue({
      id: mockId,
      name: "Wahana A",
      description: "Description A",
    });
    jest
      .spyOn(wahanaService, "update")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {
      params: {
        id: mockId,
      },
      body: mockRequestBody,
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleUpdateWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockId);
    expect(wahanaService.update).toHaveBeenCalledWith(mockId, mockRequestBody);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("getByPkWahana", () => {
  test("should return status 201 and the retrieved data when valid ID is provided", async () => {
    const mockId = 1;
    const mockWahana = {
      id: mockId,
      name: "Wahana A",
      description: "Description A",
    };

    jest.spyOn(wahanaService, "findByPk").mockResolvedValue(mockWahana);

    const mockReq = {
      params: {
        id: mockId,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetByPkWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockId);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockWahana,
    });
  });

  test("should return status 401 and an error message when invalid ID is provided", async () => {
    const mockInvalidId = "invalidId";
    const errorMessage = "Data tidak ditemukan";

    jest.spyOn(wahanaService, "findByPk").mockResolvedValue(null);

    const mockReq = {
      params: {
        id: mockInvalidId,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetByPkWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockInvalidId);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
  test("should return status 401 and an error message when findByPk function throws an error", async () => {
    const mockId = "validId";
    const errorMessage = "Some error occurred";

    jest
      .spyOn(wahanaService, "findByPk")
      .mockRejectedValue(new Error(errorMessage));

    const mockReq = {
      params: {
        id: mockId,
      },
    };

    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await wahanaController.handleGetByPkWahana(mockReq, mockRes);

    expect(wahanaService.findByPk).toHaveBeenCalledWith(mockId);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});
