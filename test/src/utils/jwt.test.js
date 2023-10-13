/* Green Work ERP by Victor Martinez */

import {
  it,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  vi,
} from "vitest";
import jwt from "jsonwebtoken";
import { attachCookiesToResponse, createJWT } from "../../../src/utils";
import config from "../../../src/configs/config";

// gets hoisted
vi.mock("jwt", () => {
  return {
    default: {
      sign: (...args) => {
        return args.length;
      },
    },
  };
});

vi.mock("config", () => {
    
});

describe("createJWT()", () => {
  let payload;
  const spySign = vi.spyOn(jwt, "sign");

  beforeAll(() => {
    payload = {
      user: "test_user",
      role: "test_role",
    };
  });

  afterEach(() => {
    payload = {
      user: "test_user",
      role: "test_role",
    };

    vi.mockReset;
  });

  it("should create a token that is signed", () => {
    // TODO: write test
    // Arange
    // Act
    // Assert
  });

  it("should recieve a string", () => {});

  it("should return a string", () => {
    const token = createJWT(payload);

    expect(typeof token).toBe("string");
  });

  it("should execute the jwt.sign method", () => {
    createJWT(payload);

    expect(jwt.sign).toBeCalled();
  });

  it("should recieve 3 parameters the jwt.sign method", () => {
    createJWT(payload);

    expect(jwt.sign).toBeCalledWith(payload, '', 123);
  });

  it("should recieve a strong password the jwt.sign method", () => {

  })
});

describe("isTokenValid()", () => {
  it("should return a true when token is valid", () => {});

  it("should return false when token is invalid", () => {});
});

describe("attachCookiesToResponse()", () => {
  it("should set a signed cookie with a valid JWT Token", () => {
    // TODO: write test
  });
});
