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
import {
  attachCookiesToResponse,
  createJWT,
  isTokenValid,
} from "../../../src/utils/jwt";
import * as config from "../../../src/configs/config";

let payload;

// vitest automatically hoist the mock but in jest we must declare it at the top before the imports
vi.mock('jwt');

// This code might not be necessary because we mock jwt without passing functions
// mock automatically creates the spy functions by default when only using vi.mock('jwt');
vi.spyOn(jwt, 'sign');
vi.spyOn(jwt, 'verify');

const mockResponse = {
  cookie: vi.fn(),
};

describe("JWT", () => {

  describe("createJWT()", () => {
    

    beforeAll(() => {
      payload = {
        userId: "123",
        user: "test_user",
        role: "test_role",
      };
    });

    afterEach(() => {
      payload = {
        userId: "123",
        user: "test_user",
        role: "test_role",
      };

    });

    afterAll(() => {
      vi.resetAllMocks();
    });

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

      expect(jwt.sign).toBeCalledWith(payload, config.jwt.secret, {
        expiresIn: config.jwt.lifetime,
      });
    });

    it("should return a valid token", () => {
      const token = createJWT(payload);
      
      expect(typeof token).toBe("string");

      const decoded = jwt.verify(token, config.jwt.secret);
      expect(decoded.userId).toBe(payload.userId);
    });
  });

  describe("isTokenValid()", () => {
    let token;

    beforeAll(() => {
      payload = {
        userId: "123",
        user: "test_user",
        role: "test_role",
      };

    });

    afterAll(() => {
      vi.resetAllMocks();
    });

    it("should recieve 2 parameters the jwt.verify method", () => {
      token = createJWT(payload);

      isTokenValid({ token })

      expect(jwt.verify).toBeCalledWith(token, config.jwt.secret);
    });

    it("should execute the sign method", () => {
      token = createJWT;

      isTokenValid({ token });

      expect(jwt.verify).toBeCalled();
    });
  });

  describe("attachCookiesToResponse()", () => {

    afterAll(() => {
      vi.resetAllMocks();
    });
    
    it("should call the createJWT method which includes the jwt.sign", () => {
      attachCookiesToResponse({ res: mockResponse, user: payload });

      expect(jwt.sign).toBeCalled();
    });

    it("should attach the cookies to the response", () => {
      // attachCookiesToResponse({ res: mockResponse, user: payload });

      const token = createJWT(payload);

      // Expect the `cookie` method to have been called with the correct arguments
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "token",
        token,
        {
          httpOnly: true,
          expires: expect.any(Date),
          secure: false,
          signed: true,
        }
      );
    });
  });
});
