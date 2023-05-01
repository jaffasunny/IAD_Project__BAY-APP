import axios from "axios";

export const helperReady = async (setHelpNeededValue, handleOpen) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `/api/helper_ready/${localStorage.getItem("uid")}`,
      // url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/helper_ready/${localStorage.getItem(
      //   "uid"
      // )}`,
      data: "",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    // console.log(data);
    if (data.first_name) {
      setHelpNeededValue(data);
      handleOpen();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPoi = async (beachInfo, token, setCardData) => {
  const { data } = await axios.get(
    // `/api/nearbypoi/${beachInfo?.id}`,
    `http://ec2-3-92-183-0.compute-1.amazonaws.com/nearbypoi/${beachInfo?.id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  setCardData(data);
};
