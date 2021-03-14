/*
    Functions for calculating the yield for one plant,
    the yield for a crop and the total yield
*/
const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = input => input.crop.yield * input.numCrops;
const getTotalYield = ({ crops }) => {
    let totalYield = 0;
    crops.forEach(crop => {
        let cropYield = getYieldForCrop(crop);
        totalYield += cropYield;
    });
    return totalYield;
};

// A function to calculate the costs for a crop
const getCostsForCrop = input => input.crop.cost * input.numCrops;

// A function to calculate the revenue for a crop
const getRevenueForCrop = input => getYieldForCrop(input) * input.crop.salePrice;

// A function to calculate the profit for a crop
const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

// A function to calculate the total profit
const getTotalProfit = ({ crops }) => {
    let totalProfit = 0;
    crops.forEach(crop => {
        let cropProfit = getProfitForCrop(crop);
        totalProfit += cropProfit;
    });
    return totalProfit;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};