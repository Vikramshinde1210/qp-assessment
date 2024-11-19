const GroceryItem = require('../models/groceryItem');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.addGroceryItem = asyncHandler(async (req, res) => {
  const { name, price, stock } = req.body;
  const result = await GroceryItem.create({ name, price, stock });
  if(!result) throw new ApiError(500, "Unable to add grocery to store, something went wrong");
  return res
  .status(201)
  .json(new ApiResponse(200, result, "grocery added to store successfully"))
});

exports.viewGroceryItems = asyncHandler(async (req, res) => {
  const result = await GroceryItem.findAll();
  if(!result) throw new ApiError(500, "Unable to fetch grocery from store, something went wrong");
  return res
  .status(200)
  .json(new ApiResponse(200, result, "grocery fetched successfully"))
});

exports.updateGroceryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  const result = await GroceryItem.update({ name, price, stock }, { where: { id } });
  console.log(result)
  if(result[0] < 1) throw new ApiError(404, "grocey item you're trying to update is not present");
  return res
  .status(200)
  .json(new ApiResponse(200, {id}, "grocery updated successfully"))
});

exports.deleteGroceryItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await GroceryItem.destroy({ where: { id } });
  console.log(result)
  if(result < 1) throw new ApiError(404, "grocery item is not present");
  return res
  .status(200)
  .json(new ApiResponse(200, {id}, "grocery deleted successfully"))

});
