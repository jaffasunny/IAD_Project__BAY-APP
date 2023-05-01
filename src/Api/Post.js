import axios from "axios";
import { toast } from "react-toastify";

let baseUrl = "http://ec2-3-92-183-0.compute-1.amazonaws.com";

// Login
export const login = async (email, password, setToken) => {
  const { data } = await axios.post(
    `${baseUrl}/user/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // JWT TOKEN and response message
  const { token, email: email_resp, name, uid, response } = await data;
  localStorage.setItem("token", token);
  localStorage.setItem("uid", uid);
  localStorage.setItem("email", email_resp);
  localStorage.setItem("name", name);

  if (data === 422 || !data || !token) {
    toast.error(response || "Login Failed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setToken(localStorage.getItem("token"));
  }
};

// Signup
export const signUp = async (
  email,
  password,
  fname,
  lname,
  age,
  gender,
  setToken
) => {
  const { data } = await axios.post(
    `${baseUrl}/user/signup`,
    {
      email: email,
      password: password,
      first_name: fname,
      last_name: lname,
      age: age,
      gender: gender,
      helper: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // JWT TOKEN and response message
  const { token, email: email_resp, name, uid, response } = await data;
  setToken(localStorage.setItem("token", token));
  localStorage.setItem("uid", uid);
  localStorage.setItem("email", email_resp);
  localStorage.setItem("name", name);

  if (data === 422 || !data || !token) {
    toast.error(response, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success("Successfully Registered!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setToken(localStorage.getItem("token"));
  }
};

export const updateLocation = (req_lat, req_long) => {
  try {
    axios.post(
      `http://ec2-3-92-183-0.compute-1.amazonaws.com/updatelocation/${localStorage.getItem(
        "uid"
      )},${localStorage.getItem("email")},${req_lat},${req_long}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getNearByBeach = async (lat, long, setBeachInfo) => {
  try {
    const { data } = await axios.get(
      `http://ec2-3-92-183-0.compute-1.amazonaws.com/nearbybeach/${lat},${long}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const { id, name } = await data;
    setBeachInfo({ id, name });
  } catch (error) {
    console.log(error);
  }
};

export const helperStatus = async (helper) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/updatehelper/${localStorage.getItem(
        "email"
      )},${helper}`,
      data: "",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const endSos = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/end_sos/${localStorage.getItem(
        "uid"
      )}`,
      data: "",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const helpNeeded = async (
  needHelpLat,
  needHelpLong,
  setHelperDetails,
  MySwal,
  handleOpen
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/sos/start/${localStorage.getItem(
        "uid"
      )},${needHelpLat},${needHelpLong}`,
      data: "",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    setHelperDetails(data);
    MySwal.close();
    handleOpen();
  } catch (error) {
    console.log(error);
  }
};
