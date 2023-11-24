/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';

import Vendor from '../../../src/models/vendor';

describe('vendor class', () => { 
    vi.mock("../../../src/models/vendor");
    vi.mock("../../../src/utils");

    it('should execute the method insertVendor', async () => {
        const vendor = {
            name: 'test',
            last_name: 'testLastName',
            company_id: '0',
            cell_number: '+123456676',
            email: 'example@email.com',
            street: '123 sesemi',
            zip_code: 12345,
            country: 'usa',
            include_address: 'true'
        }

        await Vendor.insertVendor(vendor);

        expect(Vendor.insertVendor).toBeCalled();
    });

    it('should execute the getAllVendor method', async () => {
        await Vendor.getAllVendors();

        expect(Vendor.getAllVendors).toBeCalled();
    });

    it('should execute the getSingleVendor method', async () => {
        const vendorId = 1;
        
        await Vendor.getSingleVendor(vendorId);

        expect(Vendor.getSingleVendor).toBeCalled();
    });

    it('should execute the getAddressVendor method', async () => {
        const vendorId = 1;

        await Vendor.getAddressVendor(vendorId);

        expect(Vendor.getAddressVendor).toBeCalled();
    });

    it('should execute the updateVendor', async () => {
        const updateVendor = {
            name: 'test',
            last_name: 'testLastName',
            company_id: '0',
            cell_number: '+123456676',
            email: 'example@email.com',
            street: '123 sesemi',
            zip_code: 12345,
            country: 'usa',
            include_address: 'true'
        };

        await Vendor.updateVendor(updateVendor);

        expect(Vendor.updateVendor).toBeCalled()
    });

    it('should execute the deleteAddressVendor', async () => {
        const addressId = 1;

        await Vendor.deleteAddressVendor(addressId);

        expect(Vendor.deleteAddressVendor).toBeCalled();
    });

    it('should execute the modifyAddressVendor', async () => {
        const modAddress = {
            vendorId: 1,
            address_id: 1,
            street: '123 street house',
            city: 'testCity',
            state: 'testState',
            zip_code: 123456,
            country: 'test'
        }

        await Vendor.modifyAddressVendor(modAddress);

        expect(Vendor.modifyAddressVendor).toBeCalled();
    });
 })
