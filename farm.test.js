const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
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

// Testing the getProfitForCrop function
describe('getProfitForCrop', () => {
    test('Calculate the profit for a crop', () => {
        const corn = {
            name: 'corn',
            salePrice: 4,
            cost: 2,
            yield: 5,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(180);
    });
});

// Testing the getTotalProfit function
describe('getTotalProfit', () => {
    test('Calculate total profit with multiple crops', () => {
        const corn = {
            name: 'corn',
            salePrice: 4,
            cost: 2,
            yield: 6,
        };
        const pumpkin = {
            name: 'pumpkin',
            salePrice: 5,
            cost: 3,
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 3 },
        ];
        expect(getTotalProfit({ crops })).toBe(161);
    });
});

// Testing the getYieldForPlant function with environment factors
describe('getYieldForPlant with environment factors', () => {
    const corn = {
        name: 'corn',
        yield: 30,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -60,
            },
        },
    };

    test('Get yield for plant with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
    });

    test('Get yield for plant with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test('Get yield for plant with high wind factor', () => {
        const environmentFactors = {
            wind: 'high',
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(12);
    });

    test('Get yield for plant with medium wind factor', () => {
        const environmentFactors = {
            wind: 'medium',
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(21);
    });

    test('Get yield for plant with high sun and high wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'high',
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(18);
    });
});