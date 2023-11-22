/* Green Work ERP by Victor Martinez */

import { vi, describe, it, expect, beforeEach } from "vitest";

import User from "../../../src/models/user";
import { connection } from "../../../src/utils";

describe("user class", () => {
  vi.mock("../../../src/models/user");
  vi.mock("../../../src/utils");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should execute the method getUserInfo", async () => {
    const userEmail = "test@example.com";

    await User.getUserInfo(userEmail);

    expect(User.getUserInfo).toBeCalled();
  });

  it('should execute the method findEmail Auth', async () => {
    const userEmail = "test@example.com";

    await User.findEmailAuth(userEmail);

    expect(User.findEmailAuth).toBeCalled();
  });

  it('should execute the method isUserEmpty', async () => {
    await User.isUserEmpty();

    expect(User.isUserEmpty).toBeCalled();
  });

  it('should execute the method createUser', async () => {
    const user = {
        name: 'test', 
        last_name: 'testLastName',
        cell_number: '+524771234567',
        role: 'admin',
        birth_date: Date.now,
        email: 'example@email.com',
        password: '123ABCabc'
    }
    
    await User.createUser(user);

    expect(User.createUser).toBeCalled();
  });

});
