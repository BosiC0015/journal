import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  // Navigate to home page when user trigger cancel button
  const cancel = () => {
    navigate("/");
  };
  // Validation for user input
  const validate = () => {
    if (!email.length ||
      !password.length) {
      setError('Error: Necessary fileds cannot be blank');
      return false;
    }
    setError('');
    return true;
  };
  // Call onLogin() when user trigger confirm button
  const loginAccount = (email, password) => {
    if (validate()) {
      props.onLogin(email, password)
        .then(() => {
          alert('Successfully Logged in');
          navigate("/");
        })
        .catch(err => {
          setError(`${err}`);
        });
    }
  };

  return (
    <section className="login">
      <h1>Login Form</h1>
      <div className="login-form">
        <form
          className="login-form__form"
          id="login"
          autoComplete="off"
          onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          onSubmit={e => e.preventDefault()}
        >
          <div className="email">
            <label htmlFor="Email">Your Email </label>
            <input
              placeholder="Please Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
            <div className="password">
            <label htmlFor="Password">Password </label>
            <input
              placeholder="Please Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="login-validation">{error}</div>
          <div className="login-button">
            <button
              className="login-button__confirm"
              onClick={() => loginAccount(email, password)}
            >Login</button>
            <button
              className="login-button__cancel"
              onClick={() => cancel()}
            >Cancel</button>
            </div>
        </form>
      </div>
    </section>
  );
};