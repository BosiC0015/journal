import { useState } from "react";
import Button from "../Button";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cancel = () => {
    //navigate("/");
    // transition(BACK);
  };

  return (
    <main className="login">
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
      </form>
      <section className="login__button">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick={() =>
          props}>Confirm</Button>
      </section>
    </main>
  );
};