import Button from "../Button";
import "./SignupForm.scss";

export default function SignupForm(props) {

  const cancel = () => { };
  const validate = () => { };

  return (
    <section className="signup">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <div className="email">
          <input
            placeholder="Please Enter Your Email"
            //value={props.user.email}
            type="text"
          />
        </div>
        <div className="password">
          <input
            placeholder="Please Enter Your Password"
            //value={props.user.password}
            type="text"
          />
        </div>
        <div className="password__confirmation">
          <input
            placeholder="Please Enter Your Password Again"
            //value={props.user.password_confirmation}
            type="text"
          />
        </div>
        <div className="name">
          <input
            placeholder="Please Enter Your Name"
            //value={props.user.name}
            type="text"
          />
        </div>

        <section className="signup__button">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()} >Confirm</Button>
        </section>
      </form>
    </section>
  );
}