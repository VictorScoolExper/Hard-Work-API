/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import Company from '../../../src/models/company';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/company');

describe('Company Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute the createCompany method', async () => {
        const company = {
            name: 'test',
            service_type: 'test'
        };

        await Company.createCompany(company);

        expect(Company.createCompany).toBeCalledTimes(1);
    });

    it('should execute the getCompanyById method', async () => {
        await Company.getAllCompanies();

        expect(Company.getAllCompanies).toBeCalledTimes(1);
    });

    it('should execute the updateCompany method', async () => {
        const id = 1;
        const company = 'testCompany';

        await Company.updateCompany(id, company);

        expect(Company.updateCompany).toBeCalledTimes(1);
    });

    it('should execute the checkCompanyExistence method', async () => {
        const id = 1;

        await Company.checkCompanyExistence(id);

        expect(Company.checkCompanyExistence).toBeCalledTimes(1);
    });

})