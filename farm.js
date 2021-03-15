/*
    Functions for calculating the yield for one plant,
    the yield for a crop and the total yield
*/
const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = input => getYieldForPlant(input.crop) * input.numCrops;
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