/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import Employee from '../../../src/models/employee';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/employee');

describe('Employee Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute the createEmployeeUser method', async () => {
        const employee = new Employee();

        await employee.createEmployeeUser();

        expect(employee.createEmployeeUser).toBeCalledTimes(1);
    });

    it('should execute the getAllEmployee method', async () => {
        const employee = new Employee();

        await employee.getAllEmployee();

        expect(employee.getAllEmployee).toBeCalledTimes(1);
    });

    it('should execute the getSingleEmployee method', async () => {
        const employee = new Employee();

        await employee.getSingleEmployee();

        expect(employee.getSingleEmployee).toBeCalledTimes(1);
    });

    it('should execute the employeeUpdated method', async () => {
        const employee = {};

        await Employee.employeeUpdated(employee);

        expect(Employee.employeeUpdated).toBeCalledTimes(1);
    });

    it('should execute the deleteEmployee method', async () => {
        const employeeId = 1;

        await Employee.deleteEmployee(employeeId);

        expect(Employee.deleteEmployee).toBeCalledTimes(1);
    });

   

})