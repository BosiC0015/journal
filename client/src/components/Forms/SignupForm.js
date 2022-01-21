import { useState } from "react";
import Button from "../Button/Button";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function SignupForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState('');

  //console.log('Count');

  const cancel = () => {
    navigate("/");
    // transition(BACK);
  };

  const validate = () => {
    if (!email.length ||
      !password.length ||
      !password_confirmation.length ||
      !name.length) {
      setError('Error: Necessary fileds cannot be blank');
      return false;
    }
    else if (password !== password_confirmation) {
      setError('Error: Passwords are different');
      return false;
    }
    else if (!name.replace(/\s/g, '').length) {
      setError('Error: Name only contains whitespace');
      return false;
    }
    setError('');
    return true;
  };

  const createAccount = (email, password, name) => {
    const user = { email, password, name };
    if (validate()) {
      props.onSignup(user)
        .then(() => {
          alert('Successfully Signed Up');
          navigate("/");
          // transition(HOME);
        })
        .catch(err => {
          setError(`${err}`);
          // transition(ERROR_SIGNUP, true);
        });
    }
  };

  return (
    <section className="signup">
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
        <div className="password__confirmation">
          <input
            placeholder="Please Enter Your Password Again"
            value={password_confirmation}
            onChange={(event) => setPassword_confirmation(event.target.value)}
            type="text"
          />
        </div>
        <div className="name">
          <input
            placeholder="Please Enter Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <section className="signup__validation">{error}</section>
        <section className="signup__button">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() =>
            createAccount(email, password, name)}>Confirm</Button>
        </section>
      </form>
    </section>
  );
}