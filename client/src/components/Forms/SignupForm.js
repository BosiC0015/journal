import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export default function SignupForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [error, setError] = useState('');

  // Navigate to home page when user trigger cancel button
  const cancel = () => {
    navigate("/");
  };
  // Validation for user input
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
  // Call onSignup() when user trigger confirm button
  const createAccount = (email, password, name) => {
    const user = { email, password, name };
    if (validate()) {
      props.onSignup(user)
        .then(() => {
          alert('Successfully Signed Up\nPlease Login to Your Account');
          navigate("/login");
        })
        .catch(err => {
          setError(`${err}`);
        });
    }
  };

  return (
    <section className="signup">
      <h1>Sign Up Form</h1>
      <form
        autoComplete="off"
        onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
        onSubmit={e => e.preventDefault()}
      >
        <div className="email">
          <label htmlFor="email">Your Email </label>
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
        <div className="password__confirmation">
          <label htmlFor="Password">Confirm Password </label>
          <input
            placeholder="Please Enter Your Password Again"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            type="password"
          />
        </div>
        <div className="name">
          <label htmlFor="Password">Your Name   </label>
          <input
            placeholder="Please Enter Your Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <div className="signup-validation">{error}</div>
        <div className="signup-button">
          <button
            className="signup-button__confirm" onClick={() =>
            createAccount(email, password, name)}
          >Sign Up</button>
          <button
            className="signup-button__cancel"
            onClick={() => cancel()}
          >Cancel</button>
        </div>
      </form>
    </section>
  );
}