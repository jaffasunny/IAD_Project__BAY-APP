import axios from "axios";
import { toast } from "react-toastify";

export const loginFunc = async (email, password, setToken) => {
  const { data } = await axios.post(
    `http://ec2-3-92-183-0.compute-1.amazonaws.com/user/login`,
    // `/api/user/login`,
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
