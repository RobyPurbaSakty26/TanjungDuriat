const userService = require("../../../service/userService");
const userContriller = require("./userContriller");

/* eslint-disable no-undef */
jest.mock("../../../service/wahanaService");

describe("handdlerUpdateUser", () => {
  test("should return status 201 and a success message when valid data is provided", async () => {
    const mockId = "validId";
    const mockRequestBody = {
      Name: "John Doe",
      Email: "john@example.com",
      Password: "newPassword",
    };

    jest.spyOn(userService, "verifyEmail");
    jest.spyOn(userService, "update").mockResolvedValue();

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

    await userContriller.handleUpdateUser(mockReq, mockRes);

    expect(userService.verifyEmail).toHaveBeenCalledWith(mockRequestBody.Email);
    expect(userService.update).toHaveBeenCalledWith(mockRequestBody, mockId);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      message: "Update data berhasil",
    });
  });

  test("should return status 401 and an error message when userService.verifyEmail throws an error", async () => {
    const mockId = "validId";
    const mockRequestBody = {
      Name: "John Doe",
      Email: "john@example.com",
      Password: "newPassword",
    };
    const errorMessage = "Invalid email";

    jest.spyOn(userService, "verifyEmail").mockImplementation(() => {
      throw new Error(errorMessage);
    });

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
    await userContriller.handleUpdateUser(mockReq, mockRes);

    expect(userService.verifyEmail).toHaveBeenCalledWith(mockRequestBody.Email);
    expect(userService.update).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });

  test("should return status 401 and an error message when update function throws an error", async () => {
    const mockId = "validId";
    const mockRequestBody = {
      Name: "John Doe",
      Email: "john@example.com",
      Password: "newPassword",
    };
    const errorMessage = "Some error occurred";

    jest.spyOn(userService, "verifyEmail").mockResolvedValue(true);
    jest
      .spyOn(userService, "update")
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
    await userContriller.handleUpdateUser(mockReq, mockRes);

    expect(userService.verifyEmail).toHaveBeenCalledWith(mockRequestBody.Email);
    expect(userService.update).toHaveBeenCalledWith(mockRequestBody, mockId);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: errorMessage,
    });
  });
});

describe("handllerDeleteUser", () => {
  test("should return status 201 and a success message when valid ID is provided", async () => {
    const mockId = "validId";

    jest.spyOn(userService, "delete").mockResolvedValue();

    const mockReq = {
      params: {
        id: mockId,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await userContriller.handleDeleteUser(mockReq, mockRes);

    expect(userService.delete).toHaveBeenCalledWith(mockId);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "OK",
      message: "DELETE DATA SUCCESS",
    });
  });

  test("should return status 401 and an error message when delete function throws an error", async () => {
    const mockId = "validId";
    const errorMessage = "Some error occurred";

    jest
      .spyOn(userService, "delete")
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

    await userContriller.handleDeleteUser(mockReq, mockRes);

    expect(userService.delete).toHaveBeenCalledWith(mockId);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });
});

describe("handllerGetByPkUser", () => {
  test("should return status 201 and the retrieved user data when valid ID is provided", async () => {
    const mockId = "validId";
    const mockUser = {
      id: mockId,
      name: "John Doe",
      email: "john@example.com",
    };

    jest.spyOn(userService, "getByPk").mockResolvedValue(mockUser);

    const mockReq = {
      params: {
        id: mockId,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userContriller.handleGetByPkUser(mockReq, mockRes);
    expect(userService.getByPk).toHaveBeenCalledWith(mockId);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Ok",
      data: mockUser,
    });
  });

  test("should return status 401 and an error message when invalid ID is provided", async () => {
    const mockInvalidId = "invalidId";

    jest.spyOn(userService, "getByPk").mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        id: mockInvalidId,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await userContriller.handleGetByPkUser(mockReq, mockRes);

    expect(userService.getByPk).toHaveBeenCalledWith(mockInvalidId);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "Fail",
      message: "error",
    });
  });
});
