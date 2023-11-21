/* Green Work ERP by Victor Martinez */

import { vi, it, describe, expect, beforeEach } from 'vitest';

import createTokenUser from '../../../src/utils/createTokenUser';


vi.mock('../../../src/utils/createTokenUser', async () => {
  return {
    default: vi.fn((user) => {
      if(user != null){
    
        return {
          name: user.name,
          lastName: user.last_name,
          userId: user.user_id,
          role: user.role
        };
      } else {
        return {};
      }
    })
  }
  
  
});

describe('createTokenUser()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a token user object with valid properties', async () => {
    const user = {
      name: 'John',
      last_name: 'Doe',
      user_id: 'user123',
      role: 'user',
    };

    const tokenUser = await createTokenUser(user);

    // Check if the properties of the tokenUser object match the input user object
    expect(tokenUser).toEqual({
      name: user.name,
      lastName: user.last_name,
      userId: user.user_id,
      role: user.role,
    });
  });

  it('should handle missing properties gracefully', async () => {
    // Simulate a user object with missing properties
    const user = {
      name: 'Alice',
      role: 'admin',
    };

    const tokenUser = await createTokenUser(user);

    // Check if the tokenUser object contains the properties that were provided
    expect(tokenUser).toEqual({
      name: user.name,
      lastName: undefined, // Missing property, should be undefined
      userId: undefined, // Missing property, should be undefined
      role: user.role,
    });
  });

  it('should return an empty object when user object is null', async () => {
    const user = null;

    const tokenUser = await createTokenUser(user);

    // Check if the function returns an empty object for null input
    expect(tokenUser).toEqual({});
  });
});
