/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import CompanyDepartment from '../../../src/models/company_department';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/company_department');

describe('Company Department class', () => {
    it('should execute the createDepartment method', async () => {
        const companyDepartment = new CompanyDepartment({
            name: 'test',
            description: 'test description'
        });

        await companyDepartment.createDepartment();

        expect(companyDepartment.createDepartment).toBeCalledTimes(1);
    });

    it('should execute the selectDepartments method', async () => {
        const companyDepartment = new CompanyDepartment();

        await companyDepartment.selectDepartments();

        expect(companyDepartment.selectDepartments).toBeCalledTimes(1);
    });

    it('should execute the selectDepartmentName method', async () => {
        const department_id = 1;

        await CompanyDepartment.selectDepartmentName(department_id);

        expect(CompanyDepartment.selectDepartmentName).toBeCalledTimes(1);
    });

    it('should execute the updateDepartment method', async () => {
        const companyDepartment = new CompanyDepartment();

        await companyDepartment.updateDepartment();

        expect(companyDepartment.updateDepartment).toBeCalledTimes(1);
    });

    it('should execute the deleteDepartment method', async () => {
        const companyDepartment = new CompanyDepartment();

        await companyDepartment.deleteDepartment();

        expect(companyDepartment.deleteDepartment).toBeCalledTimes(1);
    });
});