import { useState } from "react";
import Button from "../Button/Button";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

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
      <form
        autoComplete="off"
        onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
        onSubmit={e => e.preventDefault()}>
        <div className="email">
          <label for="Email">Your Email </label>
          <input
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="password">
          <label for="Password">Password </label>
          <input
            placeholder="Please Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <section className="login__validation">{error}</section>
        <section className="login__button">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() =>
            loginAccount(email, password)}>Confirm</Button>
        </section>
      </form>
    </section>
  );
};