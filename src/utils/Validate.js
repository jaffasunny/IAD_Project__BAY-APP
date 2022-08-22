// validate Login form and set errors if found
const LoginValidate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  // if (!values.username) {
  //   errors.username = "Username is required!";
  // }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

// validate Signup form and set errors if found
const SignupValidate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.username) {
    errors.username = "Username is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  if (!values.fname) {
    errors.fname = "Field empty";
  }
  if (!values.lname) {
    errors.lname = "Field empty";
  }
  if (values.age.length === 1) {
    errors.age = "Age is required";
  } else if (values.age < 10) {
    errors.age = "Age must be a valid number!";
  }
  if (values.password !== values.cpassword) {
    errors.password = "Password don't match";
  }
  if (values.agreement === false) {
    errors.agreement = "Required!";
  }
  if (!values.gender) {
    errors.gender = "Required";
  }
  return errors;
};

export { LoginValidate, SignupValidate };
