/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import Attendance from '../../../src/models/attend';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/attend');

describe('Attendance Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute the addAttendance method', async () => {
        const employee_id = 1;
        const status = 'testStatus';

        await Attendance.addAttendance(employee_id, status);

        expect(Attendance.addAttendance).toBeCalledTimes(1);
    });

    it('should execute the getAllAttendByDate method', async () => {
        const start_date = Date.now - 6;
        const end_date = Date.now - 1;

        await Attendance.getAllAttendByDate(start_date, end_date);

        expect(Attendance.getAllAttendByDate).toBeCalledTimes(1);
    });

    it('should execute the getAttendById method', async () => {
        const attend_id = 1;

        await Attendance.getAttendById(attend_id);

        expect(Attendance.getAttendById).toBeCalledTimes(1);
    });

    it('should execute the getAttendOfEmployeeByRangeDate', async () => {
        const start_date = Date.now - 6;
        const end_date = Date.now - 1;
        const employee_id = 1;

        await Attendance.getAttendsOfEmployeeByRangeDate(start_date, end_date, employee_id);

        expect(Attendance.getAttendsOfEmployeeByRangeDate).toBeCalledTimes(1);
    });

    it('should execute the modifyAttendance method', async () => {
        const attend_id = 1;
        const status = 'testStatus';

        await Attendance.modifyAttendance(attend_id, status);

        expect(Attendance.modifyAttendance).toBeCalledTimes(1);
    });

    it('should execute the deleteAttendance method', async () => {
        const attend_id = 1;

        await Attendance.deleteAttendance(attend_id);

        expect(Attendance.deleteAttendance).toBeCalledTimes(1);
    });
})