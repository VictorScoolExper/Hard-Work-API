/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import ScheduleServiceMaterial from '../../../src/models/scheduled_service_material';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/scheduled_service_material');

describe('Scheduled Service Material class', () => {
    it('should execute getServiceMaterials method', async () => {
        const service = {
            service_schedule_id: 1
        };

        await ScheduleServiceMaterial.getServiceMaterials(service);

        expect(ScheduleServiceMaterial.getServiceMaterials).toBeCalledTimes(1);
    });

    it('should execute getSingleServiceMaterial method', async () => {
        const serviceMaterial = {
            scheduled_service_material_id: 1
        };

        await ScheduleServiceMaterial.getSingleServiceMaterial(serviceMaterial);

        expect(ScheduleServiceMaterial.getSingleServiceMaterial).toBeCalledTimes(1);
    });

    it('should execute the updateServiceMaterial method', async () => {
        const serviceMaterial = {
            scheduled_service_material_id: 1,
            material_id: 1,
            qty: 1,
            sub_total: 250.98
        };

        await ScheduleServiceMaterial.updateServiceMaterial(serviceMaterial);

        expect(ScheduleServiceMaterial.updateServiceMaterial).toBeCalledTimes(1);
    });

})