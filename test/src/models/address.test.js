/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import Address from '../../../src/models/address';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/address');

describe('Address class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute the getSingleAddress method', async () => {
        const addressId = 1;

        await Address.getSingleAddress(addressId);

        expect(Address.getSingleAddress).toBeCalledTimes(1);
    });

    it('should execute the updateSingleAddress', async () => {
        const address = {};

        await Address.updateSingleAddress(address);

        expect(Address.updateSingleAddress).toBeCalledTimes(1);
    });

})