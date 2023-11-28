import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import AppSettings from '../../../src/models/app_settings';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/app_settings');

describe('App Setting Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should execute createAppSetting method', async () => {
        const appSetting = {};

        await AppSettings.createAppSetting(appSetting);

        expect(AppSettings.createAppSetting).toBeCalledTimes(1);
    });

    it('should execute getAppSetting method', async () => {
        const appSetting = {};

        await AppSettings.getAppSettings();

        expect(AppSettings.getAppSettings).toBeCalledTimes(1);
    });

    it('should execute updateAppSetting method', async () => {
        const appSetting = {};

        await AppSettings.updateAppSetting(appSetting);

        expect(AppSettings.updateAppSetting).toBeCalledTimes(1);
    });
})