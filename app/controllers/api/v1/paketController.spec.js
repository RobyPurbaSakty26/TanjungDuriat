const paketService = require("../../../service/paketService");
const paketController = require("./paketController");
/* eslint-disable no-undef */
jest.mock("../../../service/paketService");
describe("handllerCreatePaket", () => {
  test("sould retun 201 status ok json data and count", async () => {
    // mockRequst and mock response
    const mockRequest = {
      body: {
        idWahana: 1,
        NamePackage: "Paket 1",
        Price: 10000,
        Description: "ada",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // mockService function
    paketService.create = jest
      .fn()
      .mockResolvedValueOnce({ status: "Ok", data: mockRequest.body });
    await paketController.handlerCreatePaket(mockRequest, mockResponse);

    // expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(paketService.create).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockRequest.body,
    });
  });

  test("should return false retun err message input tidak lengkap", async () => {
    //    deskripsi can't input
    const mockRequest = {
      body: {
        idWahana: 1,
        NamePackage: "Paket 1",
        Price: 10000,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    paketService.create = jest
      .fn()
      .mockResolvedValueOnce({ status: "Ok", data: mockRequest.body });
    await paketController.handlerCreatePaket(mockRequest, mockResponse);

    expect(paketService.create).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Input data belum lengkap",
    });
  });
});

describe("handllerGetByPkPaket", () => {
  test("should return status Ok and data by Pk", async () => {
    // mock reques response
    const mockRequest = {
      params: {
        id: 1,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockDataPaket = {
      id: 1,
      idWahana: 1,
      NamePackage: "Paket 1",
      Price: 10000,
      Description: "none",
      createdAt: "2023-06-24T03:14:35.210Z",
      updatedAt: "2023-06-24T03:14:35.210Z",
    };

    paketService.getByPk.mockResolvedValueOnce(mockDataPaket);
    // call controler paket function
    await paketController.handlerGetByPkPaket(mockRequest, mockResponse);

    expect(paketService.getByPk).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockDataPaket,
    });
  });

  test("should return status Fail message data atidak ditemukan", async () => {
    // mock reques response
    const mockRequest = {
      params: {
        id: 1,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    paketService.getByPk.mockResolvedValueOnce(null);
    // call controler paket function
    await paketController.handlerGetByPkPaket(mockRequest, mockResponse);

    expect(paketService.getByPk).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Data tidak ditemukan",
    });
  });

  test("should retun status 400 meesage error", async () => {
    // mock reques response
    const mockRequest = {
      params: {
        id: 1,
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const err = new Error("Error");
    paketService.getByPk.mockRejectedValue(err);
    // call controler paket function
    await paketController.handlerGetByPkPaket(mockRequest, mockResponse);

    expect(paketService.getByPk).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Error",
    });
  });
});

describe("handllerGetAllPaket", () => {
  test("should retun all data paket", async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockPaketData = [
      { id: 1, name: "Paket A", price: 100 },
      { id: 2, name: "Paket B", price: 200 },
    ];
    const mockCount = 2;
    paketService.getAll.mockResolvedValueOnce({
      data: mockPaketData,
      count: mockCount,
    });

    // Call the handler function
    await paketController.handlerGetAllPaket(mockRequest, mockResponse);
    expect(paketService.getAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "OK",
      data: mockPaketData,
      count: mockCount,
    });
  });

  test("should retun status 400 and message error", async () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the dependencies
    const errorMessage = "Error retrieving paket data";
    paketService.getAll.mockRejectedValue(new Error(errorMessage));

    // Call the handler function
    await paketController.handlerGetAllPaket(mockRequest, mockResponse);

    expect(paketService.getAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerUpdatePaket", () => {
  test("should update paket data and return status and message", async () => {
    const mockPaketId = 1;
    const mockRequest = {
      params: {
        id: mockPaketId,
      },
      body: {
        name: "Updated Paket",
        price: 200,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockPaketData = {
      id: mockPaketId,
      name: "Original Paket",
      price: 100,
    };
    paketService.getByPk.mockResolvedValueOnce(mockPaketData);
    paketService.update.mockResolvedValueOnce();

    // Call the handler function
    await paketController.handlerUpdatePaket(mockRequest, mockResponse);

    // Verify the response
    expect(paketService.getByPk).toHaveBeenCalledWith(mockPaketId);
    expect(paketService.update).toHaveBeenCalledWith(
      mockPaketId,
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Ok",
      message: "Update data paket berhasil",
    });
  });

  test("should update paket when param null return status 400 and message error", async () => {
    const mockRequest = {
      params: {},
      body: {
        name: "Updated Paket",
        price: 200,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await paketController.handlerUpdatePaket(mockRequest, mockResponse);

    // Verify the response
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Input param salah",
    });
  });

  test("sould retun error when id by param not found", async () => {
    const mockPaketId = 1;
    const mockRequest = {
      params: {
        id: mockPaketId,
      },
      body: {
        name: "Updated Paket",
        price: 200,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    paketService.getByPk.mockResolvedValueOnce(null);

    // Call the handler function
    await paketController.handlerUpdatePaket(mockRequest, mockResponse);

    // Verify the response
    expect(paketService.getByPk).toHaveBeenCalledWith(mockPaketId);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Id tidak ditemukan",
    });
  });

  test("should return error meessage on failure", async () => {
    const mockPaketId = 1;
    const mockRequest = {
      params: {
        id: mockPaketId,
      },
      body: {
        name: "Updated Paket",
        price: 20000,
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    paketService.getByPk.mockResolvedValueOnce({
      id: mockPaketId,
      name: "Original Paket",
      price: 100,
    });
    paketService.update.mockRejectedValueOnce(
      new Error("Error updating paket data")
    );

    // Call the handler function
    await paketController.handlerUpdatePaket(mockRequest, mockResponse);

    // Verify the response
    expect(paketService.getByPk).toHaveBeenCalledWith(mockPaketId);
    expect(paketService.update).toHaveBeenCalledWith(
      mockPaketId,
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "Error updating paket data",
    });
  });
});

describe("handllerDeletePaket", () => {
  test("sould return status 200 message success deleted", async () => {
    const mockPaketId = 1;
    const mockRequest = {
      params: {
        id: mockPaketId,
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the dependencies
    paketService.delete.mockResolvedValueOnce();
    // Call the handler function
    await paketController.handlerDeletePaket(mockRequest, mockResponse);

    // Verify the response
    expect(paketService.delete).toHaveBeenCalledWith(mockPaketId);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Ok",
      message: "Paket berhasil dihapus",
    });
  });
});
