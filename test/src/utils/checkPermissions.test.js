import { vi, describe, it, expect } from 'vitest';

import checkPermissions from '../../../src/utils/checkPermissions.js'
import * as CustomError from '../../../src/errors/index.js';

vi.mock('checkPermissions');
vi.mock('CustomError');

describe('checkPermissions()', () => { 
    let requestUser;
    let resourceUserId;

    it('should not throw an error when user is admin', () => {
        requestUser = {
            role: 'admin'
        };
        resourceUserId = '12345';

        const response = checkPermissions(requestUser, resourceUserId);

        expect(response).toBeUndefined();
    })

    it('should not throw an error when user is the resource owner', () => {
        requestUser = {
            userId: '12345'
        };
        resourceUserId = '12345';

        const response = checkPermissions(requestUser, resourceUserId);

        expect(response).toBeUndefined();
    })

    it('should throw CustomError.UnauthorizedError when user is not admin and not the resource owner', () => {
        requestUser = {
            userId: '12345'
        };
        resourceUserId = '67890';

        try {
            checkPermissions(requestUser, resourceUserId);
            // If no error is thrown, fail the test
            expect.fail('Expected an error to be thrown');
          } catch (error) {
            // Check if the error is an instance of CustomError.UnauthorizedError
            // expect(error).toBeInstanceOf(CustomError.UnauthorizedError);
            // You can also check the error message or other properties if needed
            expect(error.message).toBe('Not authorized to access this route');
          }
    })

 })