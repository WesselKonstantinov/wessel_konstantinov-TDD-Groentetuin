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

// Testing the getYieldForCrop function with environment factors
describe('getYieldForCrop with environment factors', () => {
    const pumpkin = {
        name: 'pumpkin',
        yield: 20,
        factors: {
            sun: {
                low: -20,
                medium: 0,
                high: 30,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -50,
            },
        },
    };

    const input = {
        crop: pumpkin,
        numCrops: 10,
    };

    test('Get yield for a crop with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(260);
    });

    test('Get yield for a crop with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(160);
    });

    test('Get yield for a crop with medium wind factor', () => {
        const environmentFactors = {
            wind: 'medium',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(140);
    });

    test('Get yield for a crop with high wind factor', () => {
        const environmentFactors = {
            wind: 'high',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(100);
    });

    test('Get yield for a crop with low sun and high wind factor', () => {
        const environmentFactors = {
            sun: 'low',
            wind: 'high',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(80);
    });

    test('Get yield for a crop with high sun and low wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'low',
        };

        expect(getYieldForCrop(input, environmentFactors)).toBe(260);
    });
});

// Testing the getTotalYield function with environment factors
describe('getTotalYield with environment factors', () => {
    const corn = {
        name: 'corn',
        yield: 3,
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

    const pumpkin = {
        name: 'pumpkin',
        yield: 4,
        factors: {
            sun: {
                low: -20,
                medium: 0,
                high: 30,
            },
            wind: {
                low: 0,
                medium: -30,
                high: -50,
            },
        },
    };

    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];

    test('Calculate total yield with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(32.9);
    });

    test('Calculate total yield with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(13.9);
    });

    test('Calculate total yield with high wind factor', () => {
        const environmentFactors = {
            wind: 'high',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(10);
    });

    test('Calculate total yield with low wind factor', () => {
        const environmentFactors = {
            wind: 'low',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(23);
    });

    test('Calculate total yield with high sun and low wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'low',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(32.9);
    });

    test('Calculate total yield with low sun and high wind factor', () => {
        const environmentFactors = {
            sun: 'low',
            wind: 'high',
        };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(6.2);
    });
});

// Testing the getRevenueForCrop function with environment factors
describe('getRevenueForCrop with environment factors', () => {
    const corn = {
        name: 'corn',
        salePrice: 2,
        yield: 3,
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

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test('Calculate the revenue for a crop with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(90);
    });

    test('Calculate the revenue for a crop with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(30);
    });

    test('Calculate the revenue for a crop with medium wind factor', () => {
        const environmentFactors = {
            wind: 'medium',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(42);
    });

    test('Calculate the revenue for a crop with high wind factor', () => {
        const environmentFactors = {
            wind: 'high',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(24);
    });

    test('Calculate the revenue for a crop with low sun and medium wind factor', () => {
        const environmentFactors = {
            sun: 'low',
            wind: 'medium',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(21);
    });

    test('Calculate the revenue for a crop with high sun and medium wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'medium',
        };

        expect(getRevenueForCrop(input, environmentFactors)).toBe(63);
    });
});

// Testing the getProfitForCrop function with environment factors
describe('getProfitForCrop with environment factors', () => {
    const corn = {
        name: 'corn',
        salePrice: 2,
        cost: 1,
        yield: 3,
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

    const input = {
        crop: corn,
        numCrops: 10,
    };

    test('Calculate the profit for a crop with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(80);
    });

    test('Calculate the profit for a crop with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(20);
    });

    test('Calculate the profit for a crop with medium wind factor', () => {
        const environmentFactors = {
            wind: 'medium',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(32);
    });

    test('Calculate the profit for a crop with high wind factor', () => {
        const environmentFactors = {
            wind: 'high',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(14);
    });

    test('Calculate the profit for a crop with high sun and medium wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'medium',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(53);
    });

    test('Calculate the profit for a crop with low sun and high wind factor', () => {
        const environmentFactors = {
            sun: 'low',
            wind: 'high',
        };

        expect(getProfitForCrop(input, environmentFactors)).toBe(2);
    });
});

// Testing the getTotalProfit function with environment factors
describe('getTotalProfit with environment factors', () => {
    const corn = {
        name: 'corn',
        yield: 5,
        salePrice: 4,
        cost: 2,
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
    }

    const tomato = {
        name: 'tomato',
        yield: 3,
        salePrice: 5,
        cost: 3,
        factors: {
            sun: {
                low: -20,
                medium: 0,
                high: 40,
            },
        },
    };

    const crops = [
        { crop: corn, numCrops: 6 },
        { crop: tomato, numCrops: 3 },
    ];

    test('Calculate total profit with high sun factor', () => {
        const environmentFactors = {
            sun: 'high',
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(222);
    });

    test('Calculate total profit with low sun factor', () => {
        const environmentFactors = {
            sun: 'low',
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(75);
    });

    test('Calculate total profit with medium wind factor', () => {
        const environmentFactors = {
            wind: 'medium',
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(108);
    });

    test('Calculate total profit with low sun and high wind factor', () => {
        const environmentFactors = {
            sun: 'low',
            wind: 'high',
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(39);
    });

    test('Calculate total profit with high sun and medium wind factor', () => {
        const environmentFactors = {
            sun: 'high',
            wind: 'medium',
        };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(168);
    });
});