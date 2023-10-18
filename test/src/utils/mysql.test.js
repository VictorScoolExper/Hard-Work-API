/* Green Work ERP by Victor Martinez */

import { vi, it, describe, expect, beforeEach } from "vitest";
import mysql from "mysql";

import { connectDB } from "../../../src/utils/mysql";

vi.mock("mysql", () => {
  return {
    default: {
      createConnection: vi.fn(() => ({
        connect: vi.fn(),
        on: vi.fn(),
      })),
    },
  };
});

// const dbconfig = {
//   host: "127.0.0.1",
//   user: "john",
//   password: "12345",
//   database: "exampleDB",
// };

describe("MySQL", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("connectionDB", () => {
    it("should successfully connect to the database", (done) => {
      connectDB();

      setTimeout(() => {
        expect(mockMysql.default.createConnection).toHaveBeenCalledTimes(1);
        done();
      }, 1000);
    });

    it('should handle database connection errors and retry', (done) => {
        const fakeError = new Error('Fake database error');
        const connection = mysql.createConnection();
        connection.connect.mockImplementationOnce((callback) => {
          callback(fakeError); // Simulate a connection error
        });
    
        connectDB();
    
        setTimeout(() => {
          expect(mysql.createConnection).toHaveBeenCalledTimes(1);
          expect(connection.connect).toHaveBeenCalledTimes(2); // Two connection attempts (initial + retry)
          done();
        }, 1000); // Adjust the timeout as needed to allow for connection retries
      });
  });
});
