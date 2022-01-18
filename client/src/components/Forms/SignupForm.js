import Button from "../Button";

export default function SignupForm(props) {

  const cancel = () => { };
  const validate = () => { };

  return (
    <section className="signup__form">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input className="email"
          placeholder="Please Enter Your Email"
          //value={props.user.email}
          type="text"
        />
        <input className="password"
          placeholder="Please Enter Your Password"
          //value={props.user.password}
          type="text"
        />
        <input className="password__confirmation"
          placeholder="Please Enter Your Password Again"
          //value={props.user.password_confirmation}
          type="text"
        />
        <input className="name"
          placeholder="Please Enter Your Name"
          //value={props.user.name}
          type="text"
        />
        <section className="signup__button">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()} >Confirm</Button>
        </section>
      </form>

    </section>
  );
}