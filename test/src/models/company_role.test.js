/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import CompanyRole from '../../../src/models/company_roles';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/company_roles');

describe('Company Role Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute createCompanyRole method', async () => {
        const companyRole = new CompanyRole({
            name: 'test',
            description: 'test description'
        });

        await companyRole.createCompanyRole();

        expect(companyRole.createCompanyRole).toBeCalledTimes(1);
    });

    it('should execute getCompanyRoles method', async () => {
        await CompanyRole.getCompanyRoles();

        expect(CompanyRole.getCompanyRoles).toBeCalledTimes(1);
    });

    it('should execute selectCompanyRoleName method', async () => {
        const role_id = 1;

        await CompanyRole.selectCompanyRoleName(role_id);

        expect(CompanyRole.selectCompanyRoleName).toBeCalledTimes(1);
    });

    it('should execute updateCompanyRole method', async () => {
        const companyRole = new CompanyRole({
            role_id: 1,
            name: 'test',
            description: 'test description'
        });

        await companyRole.updateCompanyRole();

        expect(companyRole.updateCompanyRole).toBeCalledTimes(1);
    });

    it('should execute deleteCompanyRole method', async () => {
        const companyRole = new CompanyRole({
            role_id: 1
        });

        await companyRole.deleteCompanyRole();

        expect(companyRole.deleteCompanyRole).toBeCalledTimes(1);
    });
});