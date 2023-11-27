/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import Material from '../../../src/models/material';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/material');

describe('Material Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute createMaterial method', async () => {
        const material = {
            material_name: 'test',
            description: 'test description',
            unit: 3
        };

        await Material.createMaterial(material);

        expect(Material.createMaterial).toBeCalledTimes(1);
    });

    it('should execute the getMaterials method', async () => {
        await Material.getMaterials();

        expect(Material.getMaterials).toBeCalledTimes(1);
    });

    it('should execute the updateMaterial method', async () => {
        const material = {
            material_id: 1,
            material_name: 'test',
            description: 'test description',
            unit: 1
        }

        await Material.updateMaterial(material);

        expect(Material.updateMaterial).toBeCalledTimes(1);
    });

});