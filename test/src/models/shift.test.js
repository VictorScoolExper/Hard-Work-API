/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import Shift from '../../../src/models/shift';

vi.mock('../../../src/utils');
// vi.mock('../../../src/models/employee');
vi.mock('../../../src/models/shift')

describe('Shift Class', () => { 
    it('should execute addShift method', async () => {
        const employee_id = 1;
        const start_date = Date.now - 6;
        const end_date = Date.now - 4;

        await Shift.addShift({
            employee_id: employee_id,
            start_date: start_date,
            end_time: end_date
        });

        expect(Shift.addShift).toBeCalledWith({
            employee_id: employee_id,
            start_date: start_date,
            end_time: end_date
        });
        expect(Shift.addShift).toBeCalledTimes(1);
    });

    it('should execute getAllShiftsbyDates method', async () => {
        const start_date = Date.now - 6;
        const end_date = Date.now - 4;

        await Shift.getAllShiftsbyDates(start_date, end_date);

        expect(Shift.getAllShiftsbyDates).toBeCalledWith(start_date, end_date);
        expect(Shift.getAllShiftsbyDates).toBeCalledTimes(1);
    });

    it('should execute getShiftsEmployeeByDate method', async () => {
        const employeeId = 1;
        const start_date = Date.now - 6;
        const end_date = Date.now - 4;

        await Shift.getShiftsEmployeeByDate(employeeId, start_date, end_date);

        expect(Shift.getShiftsEmployeeByDate).toBeCalledWith(employeeId, start_date, end_date);
        expect(Shift.getAllShiftsbyDates).toBeCalledTimes(1);
    });

    it('should execute getShiftsById method', async () => {
        const shiftId = 1;

        await Shift.getShiftById(shiftId);

        expect(Shift.getShiftById).toBeCalledWith(shiftId);
        expect(Shift.getShiftById).toBeCalledTimes(1);
    });

    it('should execute modifyShift method', async () => {
        const shiftId = 1;
        const start_date = Date.now - 6;
        const end_date = Date.now - 4;

        await Shift.modifyShift(shiftId, start_date, end_date);

        expect(Shift.modifyShift).toBeCalledWith(shiftId, start_date, end_date);
        expect(Shift.modifyShift).toBeCalledTimes(1);
    });

    it('should execute deleteShift method', async () => {
        const shiftId = 1;

        await Shift.deleteShift(shiftId);

        expect(Shift.deleteShift).toBeCalledWith(shiftId);
        expect(Shift.deleteShift).toBeCalledTimes(1);
    });
 })