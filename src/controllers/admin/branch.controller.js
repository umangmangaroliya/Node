import { Branch } from "../../models/branch.modal.js";
import { ApiError } from "../../utils/ApiError.js";
import ValidationError from "../../utils/ValidationError.js";
import { branchSchema } from "../../validation/branch.validation";
const addBranch = async (req, res, next) => {
  try {
    const validatedDataError = (await branchSchema.safeParseAsync(req.body))
      .error;
    if (validatedDataError) {
      throw new ApiError(
        400,
        "Validation Error",
        ValidationError(validatedDataError?.errors)
      );
    }
    const { name, address } = req.body;
    const findBranch = await Branch.findOne({ name });
    if (findBranch) {
      throw new ApiError(400, "Branch already exists");
    }
    await Branch.create({
      name,
      address,
    });
    return res.status(200).json({
      code: 200,
      message: "Branch create successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const editBranch = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const { id } = req.params;
    const findBranch = await Branch.findOne({ _id: id });
    if (!findBranch) {
      throw new ApiError(404, "Branch does not exist");
    }
    await Branch.updateOne({ _id: id }, { name, address });
    return res.status(200).json({
      code: 200,
      message: "Branch update successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export { addBranch };
