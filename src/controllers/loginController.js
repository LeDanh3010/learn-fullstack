import loginService from "../service/loginService";

const loginController = async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(200).json({
        message: "Missing field",
        DE: "1",
      });
    } else {
      const loginServiceResults = await loginService(req.body);
      res.cookie("jwt", loginServiceResults.DT.access_token, {
        httpOnly: true,
      });
      return res.status(200).json({
        message: loginServiceResults.message,
        DE: loginServiceResults.DE,
        DT: loginServiceResults.DT,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "error from server",
      DE: "1",
    });
  }
};
export default loginController;
