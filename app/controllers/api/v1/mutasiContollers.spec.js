/* eslint-disable no-undef */
const mutasiService = require("../../../service/mutasiService");
const mutasiContoller = require("./mutasiController");
jest.mock("../../../service/mutasiService");

describe("hendleGetAllMutasi", () => {
  test("should retun success status 200 and list mutasi", async () => {
    const dummyData = [
      {
        id: 8,
        idIncome: 19,
        idExpenditure: null,
        Saldo: 1120000,
        Date: "2023-06-24T08:01:29.592Z",
        createdAt: "2023-06-24T08:01:29.593Z",
        updatedAt: "2023-06-24T08:01:29.593Z",
      },
      {
        id: 9,
        idIncome: 19,
        idExpenditure: null,
        Saldo: 1120000,
        Date: "2023-06-24T08:01:29.592Z",
        createdAt: "2023-06-24T08:01:29.593Z",
        updatedAt: "2023-06-24T08:01:29.593Z",
      },
    ];

    mutasiService.getAll.mockResolvedValueOnce({ data: dummyData, count: 1 });
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = {};
    await mutasiContoller.handlerGettAllMutasi(request, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "OK",
      data: dummyData,
      count: 1,
    });
  });

  test("should return 400 and err message", async () => {
    // Mock the mutasiService.getAll() function to reject with an error
    const errorMessage = "Error";
    mutasiService.getAll.mockRejectedValueOnce(new Error(errorMessage));

    // Mock the Express response object
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the handler function
    await mutasiContoller.handlerGettAllMutasi({}, mockResponse);

    // Verify the response
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerGetMutasiByDate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should retrun 200 and data fillter by date", async () => {
    // Mock the request and response objects
    const requestBody = {
      from: "2023-06-24",
      to: "2023-06-25",
    };
    const mockRequest = {
      body: requestBody,
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Empty implementation as we're testing success case
    const mockMutasiData = [{ id: 1, name: "Mutasi 1" }];

    mutasiService.getByDate.mockResolvedValueOnce(mockMutasiData);

    // Call the handler function
    await mutasiContoller.handllerGetByDateMutasi(mockRequest, mockResponse);

    // Verify the response
    expect(mutasiService.getByDate).toHaveBeenCalledWith(
      new Date(requestBody.from),
      new Date(`${requestBody.to}T23:59:59`)
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Success",
      Data: mockMutasiData,
    });
  });

  it("should return error message on failure", async () => {
    // Mock the request and response objects
    const requestBody = {
      to: "2023-06-25",
    };
    const mockRequest = {
      body: requestBody,
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the dependencies
    const errorMessage = "Input data belum lengkap";

    mutasiService.getByDate.mockRejectedValue(new Error(errorMessage));

    // Call the handler function
    await mutasiContoller.handllerGetByDateMutasi(mockRequest, mockResponse);

    // Verify the response
    // expect(validateMutasi.validateGetByDate).toHaveBeenCalledWith(requestBody);
    expect(mutasiService.getByDate).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});
