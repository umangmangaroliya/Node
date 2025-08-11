import User from "../../models/user.model.js";
import { userSchema } from "../../validation/user.validation.js";

const me = (req, res, next) => {
  try {
    const { email, name, ...rest } = req.user;
    return res.status(200).json({
      code: 200,
      message: "User get successfully",
      success: true,
      data: { email, name },
    });
  } catch (err) {
    next(err);
  }
};

const userList = async (req, res, next) => {
  try {
    const auth = req.user;
    const { perPage, page, order, expression, search } = req.query;
    const pagination = {
      perPage: perPage || 10,
      page: page || 1,
      order: order || "asc",
      expression: expression || "createdAt",
      search: search || "",
    };

    const users = await User.find({
      _id: { $ne: auth._id },
      $or: [
        { name: { $regex: pagination.search, $options: "i" } },
        { email: { $regex: pagination.search, $options: "i" } },
      ],
    })
      .sort({ [pagination.expression]: pagination.order })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const total = await User.countDocuments({ _id: { $ne: auth._id } });

    return res.status(200).json({
      code: 200,
      message: "User list get successfully",
      success: true,
      data: users,
      pagination: {
        perPage: Number(pagination.perPage),
        page: Number(pagination.page),
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const validatedDataError = (await userSchema.safeParseAsync(req.body))
      .error;
    if (validatedDataError) {
      throw new ApiError(
        400,
        "Validation Error",
        ValidationError(validatedDataError?.errors)
      );
    }

    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser && findUser.status == true) {
      throw new ApiError(400, "User already exists");
    }
    if (findUser && findUser.status == false) {
      throw new ApiError(400, "User already exists and currently inactive.");
    }
    await User.create({
      name,
      email,
      password,
    });
    return res.status(200).json({
      code: 200,
      message: "User create successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const validatedDataError = (await userSchema.safeParseAsync(rest)).error;
    if (validatedDataError) {
      throw new ApiError(
        400,
        "Validation Error",
        ValidationError(validatedDataError?.errors)
      );
    }
    if (!id) {
      throw new ApiError(400, "User id is required");
    }
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      throw new ApiError(404, "User does not exist");
    }
    await User.updateOne({ _id: id }, rest);

    return res.status(200).json({
      code: 200,
      message: "User update successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "User id is required");
    }
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      throw new ApiError(404, "User does not exist");
    }
    await User.updateOne({ _id: id }, { status: false });
    return res.status(200).json({
      code: 200,
      message: "User delete successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const restoreUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "User id is required");
    }
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      throw new ApiError(404, "User does not exist");
    }
    await User.updateOne({ _id: id }, { status: true });
    return res.status(200).json({
      code: 200,
      message: "User restore successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "User id is required");
    }
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      throw new ApiError(404, "User does not exist");
    }
    await User.deleteOne({ _id: id });
    return res.status(200).json({
      code: 200,
      message: "User delete successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export {
  addUser,
  deleteUser,
  editUser,
  me,
  restoreUser,
  softDeleteUser,
  userList,
};
