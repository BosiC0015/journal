import useApplicationData from "../hooks/useApplicationData";
import SignupForm from "./Forms/SignupForm";
import "./Signup.scss"

export default function Signup() {
  const { state, signup } = useApplicationData();

  return (
    <main>
      <h2>Sign Up Page</h2>
      <SignupForm onSignup={signup} />
    </main>
  );
}