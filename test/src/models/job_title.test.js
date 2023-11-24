/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect} from 'vitest';
import JobTitle from '../../../src/models/job_title';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/job_title');

describe('Job Title Class', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it('should execute the createJobTitle method', async () => {
        const jobTitleObj = new JobTitle({
            name: 'test',
            description: 'test description'
        })

        await jobTitleObj.createJobTitle();

        expect(jobTitleObj.createJobTitle).toBeCalledTimes(1);
    });

    it('should execute the selectJobTitles method', async () => {
        await JobTitle.selectJobTitles();

        expect(JobTitle.selectJobTitles).toBeCalledTimes(1);
    });

    it('should execute selectJobTitleName method', async () => {
        await JobTitle.selectJobTitleName();

        expect(JobTitle.selectJobTitleName).toBeCalledTimes(1);
    });

    it('should execute updateJobTitle method', async () => {
        const jobTitleObj = new JobTitle({
            job_title_id: 1,
            name: 'testName',
            description: 'testDescription'
        });

        await jobTitleObj.updateJobTitle();

        expect(jobTitleObj.updateJobTitle).toBeCalledTimes(1);
    });

    it('should execute deleteJobTitle method', async () => {
        const jobTitleObj = new JobTitle({
            job_title_id: 1
        });

        await jobTitleObj.deleteJobTitle();

        expect(jobTitleObj.deleteJobTitle).toBeCalledTimes(1);
    })
})