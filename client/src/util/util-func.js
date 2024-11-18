export function checkEmail(value) {
  const errors = [];

  if (!value.trim().length > 0) {
    errors.push("Required (Cannot be blank)");
  }

  if (!value.endsWith("@webdevsimplified.com")) {
    errors.push("Must end in `@webdevsimplified.com`");
  }

  return errors;
}
export function checkPassword(value) {
  const errors = [];

  if (value.trim().length < 10) {
    errors.push("Must Be 10 characters or longer");
  }
  if (!value.match(/[A-Z]/)) {
    errors.push("Must include an uppercase letter");
  }
  if (!value.match(/[a-z]/)) {
    errors.push("Must include a lowercase letter");
  }
  if (!value.match(/[0-9]/)) {
    errors.push("Must include a number");
  }

  return errors;
}

export function postValidation({ title, body, userId }) {
  const error = {};

  if (title === "") {
    error.title = "Required";
  }
  if (userId === "") {
    error.userId = "Required";
  }
  if (body === "") {
    error.body = "Required";
  }

  return error;
}
