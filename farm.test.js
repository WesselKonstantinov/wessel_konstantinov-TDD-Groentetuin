const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
} = require('./farm');

// Initial tests for getYieldForPlant, getYieldForCrop and getTotalYield
describe('getYieldForPlant', () => {
    const corn = {
        name: 'corn',
        yield: 30,
    };

    test('Get yield for plant with no environment factors', () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe('getYieldForCrop', () => {
    test('Get yield for crop, simple', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe('getTotalYield', () => {
    test('Calculate total yield with multiple crops', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const pumpkin = {
            name: 'pumpkin',
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test('Calculate total yield with 0 amount', () => {
        const corn = {
            name: 'corn',
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// Testing the getCostsForCrop function
describe('getCostsForCrop', () => {
    test('Calculate the costs for a crop', () => {
        const corn = {
            name: 'corn',
            cost: 1,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getCostsForCrop(input)).toBe(10);
    });
});

// Testing the getRevenueForCrop function
describe('getRevenueForCrop', () => {
    test('Calculate the revenue for a crop', () => {
        const corn = {
            name: 'corn',
            salePrice: 2,
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(60);
    });
});