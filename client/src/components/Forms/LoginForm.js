import { useState } from "react";
import Button from "../Button";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const cancel = () => {
    navigate("/");
    // transition(BACK);
  };

  const validate = () => {
    if (!email.length ||
      !password.length) {
      setError('Error: Necessary fileds cannot be blank');
      return false;
    }
    setError('');
    return true;
  };

  const loginAccount = (email, password) => {
    const pair = { email: email, password: password };
    if (validate()) {
      props.onLogin(pair)
        .then(() => {
          alert('Successfully Logged in');
          navigate("/");
        })
        .catch(err => {
          setError(`${err}`);
          // transition(ERROR_LOGIN, true);
        });
    }
  };

  return (
    <section className="login">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <div className="email">
          <input
            placeholder="Please Enter Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
          />
        </div>
        <div className="password">
          <input
            placeholder="Please Enter Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="text"
          />
        </div>
        <section className="signup__validation">{error}</section>
        <section className="login__button">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() =>
            loginAccount(email, password)}>Confirm</Button>
        </section>
      </form>
    </section>
  );
};