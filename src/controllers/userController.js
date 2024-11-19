const GroceryItem = require('../models/groceryItem');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { Op } = require('sequelize');
const sequelize = require('../database');


exports.getAvailableItems = asyncHandler(async (req, res) => {
  const result = await GroceryItem.findAll({ where: { stock: { [Op.gt]: 0 } } });
  if(!result) throw new ApiError(500, "Unable to fetch grocery from store, something went wrong");
  return res
  .status(200)
  .json(new ApiResponse(200, result, "grocery fetched successfully"))
});


exports.bookGroceryItems = asyncHandler(async (req, res) => {
  const { items } = req.body; // Array of { id, quantity }

  if (!items || !Array.isArray(items)) {
    throw new ApiError(400, 'Invalid request body. `items` should be an array.');
  }

  const transaction = await sequelize.transaction();

  try {
    for (const item of items) {

      if (!item.id || item.quantity <= 0) {
        throw new ApiError(400, `Invalid item: ${JSON.stringify(item)}`);
      }

      const grocery = await GroceryItem.findByPk(item.id, { transaction });
      if (!grocery) {
        throw new ApiError(404, `Item with ID ${item.id} not found`);
      }

      if (grocery.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for item ID ${item.id}, marking order as failed`);
      }

      await grocery.update({ stock: grocery.stock - item.quantity }, { transaction });
    }
    
    await transaction.commit();

    return res
      .status(200)
      .json(new ApiResponse(200, "", "Grocery items booked successfully"));
  } catch (error) {
    await transaction.rollback();
    throw new ApiError(error.statusCode || 500, error.message || 'Order failed');
  }
});

