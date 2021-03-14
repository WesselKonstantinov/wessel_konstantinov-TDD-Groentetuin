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

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
};