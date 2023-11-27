/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import EmployeesAtServiceScheduled from '../../../src/models/employees_at_service_scheduled';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/employees_at_service_scheduled');

describe('Employees at Service Scheduled class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute the getAllEmployeesAtService method', async () => {
        await EmployeesAtServiceScheduled.getAllEmployeesAtService();

        expect(EmployeesAtServiceScheduled.getAllEmployeesAtService).toBeCalledTimes(1);
    });

    it('should execute the updateEmployeesAtServiceScheduled method', async () => {
        const employees = [];

        await EmployeesAtServiceScheduled.updateEmployeesAtServiceScheduled(employees);

        expect(EmployeesAtServiceScheduled.updateEmployeesAtServiceScheduled).toBeCalledTimes(1);
    });

    
});