import db from "../models";
const getGroupWithRole = async (user) => {
  const groupWithRole = await db.Group.findOne({
    where: {
      id: user.groupId,
    },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: {
        attributes: [],
      },
    },
  });
  return groupWithRole ? groupWithRole : {};
};
export default getGroupWithRole;
