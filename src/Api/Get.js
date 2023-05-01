import axios from "axios";

export const helperReady = async (setHelpNeededValue, handleOpen) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/helper_ready/${localStorage.getItem(
        "uid"
      )}`,
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

export const getComplaints = async (setComplaints) => {
  const { data } = await axios.get(
    `http://ec2-3-92-183-0.compute-1.amazonaws.com/getreports`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  setComplaints(data);
};
