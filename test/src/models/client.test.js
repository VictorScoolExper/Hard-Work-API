/* Green Work ERP by Victor Martinez */

import {vi, it, describe, beforeEach, expect, beforeAll} from 'vitest';
import Client from '../../../src/models/client';

vi.mock('../../../src/utils');
vi.mock('../../../src/models/client');

describe('Client class', () => {
    it('should execute the addClient method', async () => {
        const client = {};

        await Client.addClient(client);

        expect(Client.addClient).toBeCalledTimes(1);
    });

    it('should execute the getAllClients method', async () => {
        await Client.getAllClients();

        expect(Client.getAllClients).toBeCalledTimes(1);
    });

    it('should execute the getClientAddressesById method', async () => {
        const clientId = 1;

        await Client.getClientAddressesById(clientId);

        expect(Client.getClientAddressesById).toBeCalledTimes(1);
    });

    it('should execute the getClientById method', async () => {
        const clientId = 1;

        await Client.getClientById(clientId);

        expect(Client.getClientById).toBeCalledTimes(1);
    });

    it('should execute the deleteById method', async () => {
        const clientId = 1;
        const addressId = 2;

        await Client.deleteById(clientId, addressId);

        expect(Client.deleteById).toBeCalledTimes(1);
    });

    it('should execute the updateClient method', async () => {
        const client = {};

        await Client.updateClient(client);

        expect(Client.updateClient).toBeCalledTimes(1);
    });

})