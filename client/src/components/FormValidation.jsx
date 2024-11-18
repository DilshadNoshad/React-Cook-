import {  useMemo, useState } from "react";
import "./FormValidation.css";
import { checkEmail, checkPassword } from "../util/util-func";

export function FormValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstTime, setFirstTime] = useState(false);
  // const [emailErrors, setEmailErrors] = useState([]);
  // const [passwordErrors, setPasswordErrors] = useState([]);

  // useEffect(() => {
  //   if (firstTime) {
  //     const emailErrors = checkEmail(email);
  //     const passwordErrors = checkPassword(password);

  //     setEmailErrors(emailErrors);
  //     setPasswordErrors(passwordErrors);
  //   }
  // }, [email, password, firstTime]);

  const emailErrors = useMemo(() => {
    return firstTime ? checkEmail(email) : [];
  }, [firstTime, email]);
  const passwordErrors = useMemo(() => {
    return firstTime ? checkPassword(password) : [];
  }, [firstTime, password]);

  function onSubmitHandle(e) {
    e.preventDefault();

    setFirstTime(true);

    const emailResult = checkEmail(email);
    const passwordResult = checkPassword(password);

    // setEmailErrors(emailErrors);
    // setPasswordErrors(passwordErrors);

    if (emailResult.length !== 0 || passwordResult.length !== 0) return;

    alert("success");
  }
  return (
    <form onSubmit={onSubmitHandle} className="form">
      <div className={`form-group  ${emailErrors.length > 0 ? "error" : ""} `}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div
        className={`form-group  ${passwordErrors.length > 0 ? "error" : ""} `}
      >
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
        {passwordErrors.length > 0 && (
          <div className="msg">{passwordErrors.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
