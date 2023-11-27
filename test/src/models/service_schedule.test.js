/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import ServiceSchedule from '../../../src/models/service_schedule';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/service_schedule');

describe('Service Schedule', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute isTypeRoutine method', () => {
        const type = 'test';
        
        ServiceSchedule.isTypeRoutine(type);

        expect(ServiceSchedule.isTypeRoutine).toBeCalledWith(type);
        expect(ServiceSchedule.isTypeRoutine).toBeCalledTimes(1);
    });

    it('should execute isTypeSingle method', () => {
        const type = "test";

        ServiceSchedule.isTypeSingle(type);

        expect(ServiceSchedule.isTypeSingle).toBeCalledWith(type);
        expect(ServiceSchedule.isTypeSingle).toBeCalledTimes(1);
    });

    it('should execute createServiceSchedule method', async () => {
        const serviceScheule = {
            client_id: 1,
            address_id: 2,
            start_time: Date.now - 7,
            end_time: Date.now - 2,
            date_scheduled: Date.now,
            services: [],
            materials: [],
            employees: []
        };

        await ServiceSchedule.createServiceSchedule(serviceScheule);

        expect(ServiceSchedule.createServiceSchedule).toBeCalledWith(serviceScheule);
        expect(ServiceSchedule.createServiceSchedule).toBeCalledTimes(1);
    });

    it('should execute getServiceScheduled method', async () => {
        await ServiceSchedule.getServiceScheduled();

        expect(ServiceSchedule.getServiceScheduled).toBeCalledWith();
        expect(ServiceSchedule.getServiceScheduled).toBeCalledTimes(1);
    });

    it('should execute updateClientServiceScheduled method', async () => {
        const serviceScheduled = {};

        await ServiceSchedule.updateClientServiceScheduled(serviceScheduled);

        expect(ServiceSchedule.updateClientServiceScheduled).toBeCalledTimes(1);
    });

    it('should execute updateAddressServiceScheduled method', async () => {
        const serviceSchedule = {};

        await ServiceSchedule.updateAddressServiceScheduled(serviceSchedule);

        expect(ServiceSchedule.updateAddressServiceScheduled).toBeCalledTimes(1);
    });

    it('should execute updateToDoTimesServiceScheduled method', async () => {
        const serviceSchedule = {};

        await ServiceSchedule.updateToDoTimeServiceScheduled(serviceSchedule);

        expect(ServiceSchedule.updateToDoTimeServiceScheduled).toBeCalledTimes(1);
    });

    it('should execute updateTypeServiceScheduled method', async () => {
        const serviceScheduled = {};

        await ServiceSchedule.updateTypeServiceScheduled(serviceScheduled);

        expect(ServiceSchedule.updateTypeServiceScheduled).toBeCalledTimes(1);
    });

    it('should execute updateStatusServiceScheduled method', async () => {
        const serviceScheduled = {};

        await ServiceSchedule.updateStatusServiceScheduled(serviceScheduled);

        expect(ServiceSchedule.updateStatusServiceScheduled).toBeCalledTimes(1);
    });

})