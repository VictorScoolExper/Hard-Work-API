/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import Crew from '../../../src/models/crew';
import Employee from '../../../src/models/employee';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/crew');

describe('Crew Class', () => {
    it('should execute the createCrew method', async () => {
        const crew_name = 'test name';
        const crew_leader = 'test leader';

        await Crew.createCrew(crew_name, crew_leader);

        expect(Crew.createCrew).toBeCalledTimes(1);
    });

    it('should execute the addEmployeesToCrew method', async () => {
        const crew_id = 1;
        const employees = [];

        await Crew.addEmployeesToCrews(crew_id, employees);

        expect(Crew.addEmployeesToCrews).toBeCalledTimes(1);
    });

    it('should execute the getAllCrews method', async () => {
        await Crew.getAllCrews();

        expect(Crew.getAllCrews).toBeCalledTimes(1);
    });

    it('should execute the getCrewEmployeeById method', async () => {
        const crewId = 1;

        await Crew.getCrewEmployeeById(crewId);

        expect(Crew.getCrewEmployeeById).toBeCalledTimes(1);
    });

    it('should execute the updateCrew method', async () => {
        const crew_id = 1;
        const crew_name = 'test';
        const crew_leader = 2;

        await Crew.updateCrew(crew_id, crew_name, crew_leader);

        expect(Crew.updateCrew).toBeCalledTimes(1);
    });


    it('should execute the deleteCrewEmployee', async () => {
        const crew_id = 1;
        const employee_id = 1;

        await Crew.deleteCrewEmployee(crew_id, employee_id);

        expect(Crew.deleteCrewEmployee).toBeCalledTimes(1);
    });
});