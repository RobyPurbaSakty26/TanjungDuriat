/* eslint-disable no-undef */

const userService = require("../../../service/userService");
const UserControllers = require("./authController");

jest.mock("../../../service/userService");

describe("handleCreateUserAdminWahana", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        Name: "John Doe",
        Email: "johndoe@example.com",
        Password: "password",
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
  });

  it("should create a user with role Admin Wahana and return their data with a 201 status code", async () => {
    userService.verifyEmail.mockReturnValue();
    userService.create.mockResolvedValue({
      _id: "1",
      Name: "John Doe",
      Email: "johndoe@example.com",
      Role: "Admin Wahana",
    });

    await UserControllers.hadnleCreateUserAdminWahana(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).toHaveBeenCalledWith(
      "John Doe",
      "johndoe@example.com",
      "password",
      "Admin Wahana"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: {
        _id: "1",
        Name: "John Doe",
        Email: "johndoe@example.com",
        Role: "Admin Wahana",
      },
    });
  });

  it("should return a 401 status code with an error message if an error occurs during the user creation process", async () => {
    const errorMessage = "Error creating user";

    userService.verifyEmail.mockReturnValue();
    userService.create.mockRejectedValue(new Error(errorMessage));

    await UserControllers.hadnleCreateUserAdminWahana(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).toHaveBeenCalledWith(
      "John Doe",
      "johndoe@example.com",
      "password",
      "Admin Wahana"
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });

  it("should return a 401 status code with an error message if the email is invalid", async () => {
    const errorMessage = "Invalid email address";

    userService.verifyEmail.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await UserControllers.hadnleCreateUserAdminWahana(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });
});

describe("handleCreateUserAdminKeuangan", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        Name: "John Doe",
        Email: "johndoe@example.com",
        Password: "password",
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
  });

  test("should create a user with role Admin Wahana and return their data with a 201 status code", async () => {
    userService.verifyEmail.mockReturnValue();
    userService.create.mockResolvedValue({
      _id: "1",
      Name: "John Doe",
      Email: "johndoe@example.com",
      Role: "Admin Keuangan",
    });

    await UserControllers.hadnleCreateUserAdminKeuangan(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).toHaveBeenCalledWith(
      "John Doe",
      "johndoe@example.com",
      "password",
      "Admin Keuangan"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: {
        _id: "1",
        Name: "John Doe",
        Email: "johndoe@example.com",
        Role: "Admin Keuangan",
      },
    });
  });

  test("should return a 401 status code with an error message if an error occurs during the user creation process", async () => {
    const errorMessage = "Error creating user";

    userService.verifyEmail.mockReturnValue();
    userService.create.mockRejectedValue(new Error(errorMessage));

    await UserControllers.hadnleCreateUserAdminKeuangan(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).toHaveBeenCalledWith(
      "John Doe",
      "johndoe@example.com",
      "password",
      "Admin Keuangan"
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });

  test("should return a 401 status code with an error message if the email is invalid", async () => {
    const errorMessage = "Invalid email address";

    userService.verifyEmail.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await UserControllers.hadnleCreateUserAdminKeuangan(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });
});

// ceteate manager
describe("handleCreateUserManager", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        Name: "John Doe",
        Email: "johndoe@example.com",
        Password: "password",
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
  });

  test("should create a user with role Manager and return their data with a 201 status code", async () => {
    userService.verifyEmail.mockReturnValue();
    userService.create.mockResolvedValue({
      _id: "1",
      Name: "John Doe",
      Email: "johndoe@example.com",
      Role: "Manager",
    });

    await UserControllers.hadnleCreateUserAdminManager(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: {
        _id: "1",
        Name: "John Doe",
        Email: "johndoe@example.com",
        Role: "Manager",
      },
    });
  });

  test("should return a 401 status code with an error message if an error occurs during the user creation process", async () => {
    const errorMessage = "Error creating user";

    userService.verifyEmail.mockReturnValue();
    userService.create.mockRejectedValue(new Error(errorMessage));

    await UserControllers.hadnleCreateUserAdminManager(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });

  test("should return a 401 status code with an error message if the email is invalid", async () => {
    const errorMessage = "Invalid email address";

    userService.verifyEmail.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await UserControllers.hadnleCreateUserAdminManager(req, res);

    expect(userService.verifyEmail).toHaveBeenCalledWith("johndoe@example.com");
    expect(userService.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMessage,
    });
  });
});

// get all
describe("handleGetAllUsers", () => {
  it("should respond with status 201 and return data and count", async () => {
    const mockData = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];

    const mockCount = 2;

    userService.getAll = jest
      .fn()
      .mockResolvedValue({ data: mockData, count: mockCount });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.handleGetAllUsers(req, res);

    expect(userService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: mockData,
      count: mockCount,
    });
  });

  it("should respond with status 401 and error message", async () => {
    const errorMsg = "Unauthorized";

    userService.getAll = jest.fn().mockRejectedValue(new Error(errorMsg));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.handleGetAllUsers(req, res);

    expect(userService.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: errorMsg,
    });
  });
});

// login
describe("handleLogin", () => {
  test("responds with 201 status and user object if login details are correct", async () => {
    const req = {
      body: {
        Email: "johndoe@gmail.com",
        Password: "password123",
      },
    };

    userService.login = jest.fn().mockResolvedValue({
      name: "John Doe",
      email: "johndoe@gmail.com",
      token: "abcd",
    });

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.handleLogin(req, res);

    expect(userService.login).toHaveBeenCalledWith(
      "johndoe@gmail.com",
      "password123"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: {
        name: "John Doe",
        email: "johndoe@gmail.com",
        token: "abcd",
      },
    });
  });

  test("responds with 401 status and error message if login details are incorrect", async () => {
    const req = {
      body: {
        Email: "johndoe@gmail.com",
        Password: "incorrectpassword",
      },
    };

    userService.login = jest
      .fn()
      .mockRejectedValue(new Error("Incorrect login details"));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.handleLogin(req, res);

    expect(userService.login).toHaveBeenCalledWith(
      "johndoe@gmail.com",
      "incorrectpassword"
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: "Incorrect login details",
    });
  });
});

describe("handller authorizde", () => {
  test("success authorize and next", async () => {
    userService.authorize = jest.fn().mockResolvedValue({
      id: 1,
      username: "Joe",
    });

    const next = jest.fn();

    const req = {
      headers: {
        authorization: "Bearer token-example",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.handleAuthorize(req, res, next);

    expect(userService.authorize).toHaveBeenCalledWith("token-example");
    expect(req.user).toEqual({ id: 1, username: "Joe" });
    expect(next).toHaveBeenCalled();
  });

  test("handllerAuthorization res 402 with", async () => {
    // mock

    userService.authorize = jest.fn().mockRejectedValue();
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await UserControllers.handleAuthorize(req, res, next);

    expect(userService.authorize).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(402);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: "Bearer token salah",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("retun err bearer token salah", async () => {
    userService.authorize = jest.fn().mockResolvedValue(null);
    const req = {
      headers: {
        authorization: "Bearer invalidToken",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue({
        status: "FAIL",
        message: "Unautorize",
      }),
    };
    const next = jest.fn();

    await UserControllers.handleAuthorize(req, res, next);
    expect(userService.authorize).toHaveBeenCalledWith("invalidToken");
    expect(req.user).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(402);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: "Unautorize",
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("WhoIm", () => {
  test("should retun response 201", async () => {
    const req = {
      user: {
        id: 1,
        username: "testuser",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserControllers.whoIm(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "OK",
      data: {
        id: 1,
        username: "testuser",
      },
    });
  });

  test("should retun statue 401 status fail", async () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const err = new Error("User not found");

    await UserControllers.whoIm(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: "FAIL",
      message: err.message,
    });
  });
});
