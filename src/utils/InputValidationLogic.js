// function to check email
export function emailValidityCheck(email) {
  const validcheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return validcheck.test(email);
}

// function to check password
export function passwordValidityCheck(password) {
  const validcheck =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return validcheck.test(password);
}
