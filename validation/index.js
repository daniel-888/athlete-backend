const validator = require("validator");
const isEmpty = require("./is-empty");

exports.validateLoginInput = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "Email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateRegisterInput = (data) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.name = "First name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateAthleteCreate = (data) => {
  let errors = {};
  console.log(data);

  data.name = !isEmpty(data.name) ? data.name : "";
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  data.sports = !isEmpty(data.sports) ? data.sports : [];

  if (validator.isEmpty(data.name)) {
    errors.name = "Please input the name.";
  }

  if (validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Please select the date of birth.";
  }

  if (validator.isEmpty(data.location)) {
    errors.location = "Please select the location.";
  }

  if (data.gender !== "Male" && data.gender !== "Female") {
    errors.gender = "Gender can be Male or Female";
  }

  if (validator.isEmpty(data.gender)) {
    errors.gender = "Please select the gender.";
  }

  if (data.sports.length === 0) {
    errors.sports = "Please select the sports.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
