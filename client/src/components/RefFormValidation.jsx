import { useRef, useState } from "react";
import "./FormValidation.css";
import { checkEmail, checkPassword } from "../util/util-func";

export function RefFormValidation() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [firstTime, setFirstTime] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  function onSubmitHandle(e) {
    e.preventDefault();

    setFirstTime(true);

    const emailErrors = checkEmail(emailRef.current.value);
    const passwordErrors = checkPassword(passwordRef.current.value);

    setEmailErrors(emailErrors);
    setPasswordErrors(passwordErrors);

    if (emailErrors.length !== 0 || passwordErrors.length !== 0) return;

    alert("success");
  }
  return (
    <form onSubmit={onSubmitHandle} className="form">
      <div className={`form-group  ${emailErrors.length > 0 ? "error" : ""} `}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          onChange={
            firstTime
              ? (e) => setEmailErrors(checkEmail(e.target.value))
              : undefined
          }
          className="input"
          type="email"
          id="email"
          ref={emailRef}
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
          ref={passwordRef}
          onChange={
            firstTime
              ? (e) => setPasswordErrors(checkPassword(e.target.value))
              : undefined
          }
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
