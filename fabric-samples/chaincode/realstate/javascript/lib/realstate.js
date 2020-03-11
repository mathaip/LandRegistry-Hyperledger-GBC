'use strict';

const { Contract } = require('fabric-contract-api');

class RealState extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const houses = [
            {
                type: 'appartment',
                address: '55 Mill St, Toronto, ON M5A 3C4',
                unicID: '(416) 364-1177',
                owner: 'Wilmar',
            },
            {
                type: 'flat',
                address: '200 King St E, Toronto, ON M5A 3W8',
                unicID: '(416) 415-2000',
                owner: 'Mathai',
            },
            {
                type: 'house',
                address: '1 Austin Terrace, Toronto, ON M5R 1X8',
                unicID: '(416) 923-1171',
                owner: 'Eduardo',
            },
            {
                type: 'flat',
                address: '160 Kendal Ave, Toronto, ON M5R 1M3',
                unicID: '(416) 415-2000',
                owner: 'Edwerton',
            },
            {
                type: 'appartment',
                address: '51 Dockside Dr, Toronto, ON M5A 0B6',
                unicID: '(416) 415-2000',
                owner: 'Dave',
            },
            {
                type: 'building',
                address: '200 King St E, Toronto, ON M5A 3W8',
                unicID: '(416) 415-5000',
                owner: 'Tarum',
            },
            {
                type: 'gym',
                address: '461 Cherry St, Toronto, ON M5A 0H7',
                unicID: '(416) 304-9622',
                owner: 'Dishan',
            },
            {
                type: 'stadium',
                address: '200 King St E, Toronto, ON M5A 3W8',
                unicID: '(416) 415-2000',
                owner: 'Jamshed',
            },
            {
                type: 'warehouse',
                address: '111 Richmond St W #12, Toronto, ON M5H 2G4',
                unicID: '(416) 915-8200',
                owner: 'Diana',
            },
            {
                type: 'gallery',
                address: '317 Dundas St W, Toronto, ON M5T 1G4',
                unicID: '(416) 979-6648',
                owner: 'Erick',
            },
        ];

        for (let i = 0; i < houses.length; i++) {
            houses[i].docType = 'house';
            await ctx.stub.putState('HOUSE' + i, Buffer.from(JSON.stringify(houses[i])));
            console.info('Added <--> ', houses[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryHouse(ctx, houseNumber) {
        const houseAsBytes = await ctx.stub.getState(houseNumber); // get the house from chaincode state
        if (!houseAsBytes || houseAsBytes.length === 0) {
            throw new Error(`${houseNumber} does not exist`);
        }
        console.log(houseAsBytes.toString());
        return houseAsBytes.toString();
    }

    async createHouse(ctx, houseNumber, address, unicID, type, owner) {
        console.info('============= START : Create House ===========');

        const house = {
            type,
            docType: 'house',
            address,
            unicID,
            owner,
        };

        await ctx.stub.putState(houseNumber, Buffer.from(JSON.stringify(house)));
        console.info('============= END : Create House ===========');
    }

    async queryAllHouses(ctx) {
        const startKey = 'HOUSE0';
        const endKey = 'HOUSE999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async changeHouseOwner(ctx, houseNumber, newOwner) {
        console.info('============= START : changeHouseOwner ===========');

        const houseAsBytes = await ctx.stub.getState(houseNumber); // get the house from chaincode state
        if (!houseAsBytes || houseAsBytes.length === 0) {
            throw new Error(`${houseNumber} does not exist`);
        }
        const house = JSON.parse(houseAsBytes.toString());
        house.owner = newOwner;

        await ctx.stub.putState(houseNumber, Buffer.from(JSON.stringify(house)));
        console.info('============= END : changeHouseOwner ===========');
    }

}

module.exports = RealState;
