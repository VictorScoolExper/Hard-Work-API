/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import RoutineScheduledService from '../../../src/models/routine_scheduled_service';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/routine_scheduled_service');

describe('Routine Scheduled Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute the getAllRoutines method', async () => {
        const routineScheduledService = {
            service_schedule_id: 1
        };

        await RoutineScheduledService.getAllRoutines(routineScheduledService);

        expect(RoutineScheduledService.getAllRoutines).toBeCalledTimes(1);
    });

    it('should execute the updateDaysUntilRepeat method', async () => {
        const routineScheduledService = {
            routine_schedule_id: 1,
            days_until_repeat: 5
        };

        await RoutineScheduledService.updateDaysUntilRepeat(routineScheduledService);

        expect(RoutineScheduledService.updateDaysUntilRepeat).toBeCalledTimes(1);
    });

    it('should execute the updateStatus method', async () => {
        const routineScheduledService = {
            routine_schedule_id: 1,
            status: 'test'
        }

        await RoutineScheduledService.updateStatus(routineScheduledService);

        expect(RoutineScheduledService.updateStatus).toBeCalledTimes(1);
    });

    it('should execute the updateLastService method', async () => {
        const routineScheduledService = {
            routine_schedule_id: 1,
            last_service_date: Date.now
        }

        await RoutineScheduledService.updateLastService(routineScheduledService);

        expect(RoutineScheduledService.updateLastService).toBeCalledTimes(1);
    });
})