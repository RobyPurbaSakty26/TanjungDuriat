/* eslint-disable no-undef */
"use strict";
const { Wahana } = require("../../../models");
const WahanaService = require("../../../service/wahanaService");
const WahanaController = require("./wahanaController");
jest.mock("../../../models");

describe("#handleWhanaGetAll", () => {
  afterEach(jest.clearAllMocks);
  it("should call res.status(201) with json lis wahana", async () => {
    const wahana = {
      paket: "1",
      domisili: "Sumedang",
      nama_wahana: "Balon",
    };

    // mock model
    Wahana.findAll.mockResolvedValue(wahana);
    Wahana.count.mockResolvedValue(1);

    const { data, count } = await WahanaService.getAll();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const result = {
      status: "OK",
      data: data,
      count: count,
    };
    const mockRequest = {};

    await WahanaController.handleGetAllWahana(mockRequest, mockResponse);

    expect(Wahana.findAll).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(result);
  });

  it("should call res(401) satatus FAIL", async () => {
    const err = new Error("Error");
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    // mock model
    Wahana.findAll.mockReturnValue(Promise.reject(err));

    await WahanaController.handleGetAllWahana(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: err.message,
    });
  });
});

describe("#hadleCreateWahana", () => {
  it("sould call res.status(201) and res.json with wahana", async () => {
    const mockRequest = {
      body: {
        paket: "1",
        domisili: "Sumedang",
        nama_wahana: "Balon",
      },
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // mockModel
    Wahana.create.mockReturnValue(mockRequest.body);

    await WahanaController.handleCreateWahana(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "OK",
      data: mockRequest.body,
    });
  });

  it("should call res.status(401) and res.json with err", async () => {
    const err = new Error("err");
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // mockModel
    Wahana.create.mockReturnValue(Promise.reject(err));

    await WahanaController.handleCreateWahana(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: err.message,
    });
  });
});
