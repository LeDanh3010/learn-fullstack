import registerHandle from "../service/registerService";

const registerController = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(200).json({
        message: "Missing field",
        DE: "1",
      });
    } else if (password && password.length < 4) {
      return res.status(200).json({
        message: "The password greater than 3 letters ",
        DE: "1",
      });
    } else {
      const registerResults = await registerHandle(req.body);
      return res.status(200).json({
        message: registerResults.message,
        DE: registerResults.DE,
        fieldName: registerResults.fieldName,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "error from server",
      DE: "1",
    });
  }
};
export default registerController;
