// A function to calculate the yield for one plant depending on environment factors
const getYieldForPlant = (plant, environmentFactors = {}) => {
    let percentage = 100;
    if ('sun' in environmentFactors && 'sun' in plant.factors) {
        percentage *= (plant.factors.sun[environmentFactors.sun] + 100) / 100;
    }
    if ('wind' in environmentFactors && 'wind' in plant.factors) {
        percentage *= (plant.factors.wind[environmentFactors.wind] + 100) / 100;
    }

    return plant.yield * (percentage / 100);
};

// A function to calculate the yield for a crop
const getYieldForCrop = input => getYieldForPlant(input.crop) * input.numCrops;

// A function to calculate the total yield 
const getTotalYield = ({ crops }) => crops.map(crop => getYieldForCrop(crop)).reduce((total, current) => total + current);

// A function to calculate the costs for a crop
const getCostsForCrop = input => input.crop.cost * input.numCrops;

// A function to calculate the revenue for a crop
const getRevenueForCrop = input => getYieldForCrop(input) * input.crop.salePrice;

// A function to calculate the profit for a crop
const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

// A function to calculate the total profit
const getTotalProfit = ({ crops }) => crops.map(crop => getProfitForCrop(crop)).reduce((total, current) => total + current);

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};