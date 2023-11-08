export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "get current user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getApplicationStats = async (req, res) => {
  try {
    res.status(200).json({ msg: "application stats" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "update user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};
