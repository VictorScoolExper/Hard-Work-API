/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import Service from '../../../src/models/service';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/service');

describe('Service Class', () => {
    it('should execute createService method', async () => {
        const service = {
            service_name: 'test',
            description: 'test descripton',
            is_per_hour: true,
            price: 25
        };

        await Service.createService(service);

        expect(Service.createService).toBeCalledWith(service);
        expect(Service.createService).toBeCalledTimes(1);
    });

    it('should execute getServices method', async () => {
        await Service.getServices();

        expect(Service.getServices).toBeCalledTimes(1);
    });

    it('should execute updateService method', async () => {
        const service = {
            service_id: 1,
            service_name: 'test',
            description: 'test description',
            is_per_hour: 'true',
            price: 25
        };

        await Service.updateService(service);

        expect(Service.updateService).toBeCalledWith(service);
        expect(Service.updateService).toBeCalledTimes(1);
    });

});
