import User from "../../models/user.model.js";

const userList = async (req, res, next) => {
  try {
    const auth = req.user;
    const { perPage, page, order, expression } = req.query;
    const pagination = {
      perPage: perPage || 10,
      page: page || 1,
      order: order || "asc",
      expression: expression || "createdAt",
    };
    const users = await User.find({ _id: { $ne: auth._id } })
      .sort({ [pagination.expression]: pagination.order })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const total = await User.countDocuments({ _id: { $ne: auth._id } });

    return res.status(200).json({
      code: 200,
      message: "User list get successfully",
      success: true,
      response: {
        data: users,
        pagination: {
          ...pagination,
          total,
          totalPages: Math.ceil(total / perPage),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export { userList };
