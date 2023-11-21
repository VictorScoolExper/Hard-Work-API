// /* Green Work ERP by Victor Martinez */

// import { vi, describe, it, expect } from 'vitest';

// import User from '../../../src/models/user';


// describe("user class", () => {
//     vi.mock('connection', () => {
//         return {
//             query: (sql, params, callback) => {
//                 return 'success';
//             }
//         }
//     });

//     it('should retrieve user information from database', async () => {
//         const userEmail = 'test@example.com';
//         const userInfo = await User.getUserInfo(userEmail);

//         expect(userInfo).toBeTruthy();
//     })
// })