import useApplicationData from "../../hooks/useApplicationData";
import SignupForm from "../Forms/SignupForm";
import "./Signup.scss"
import NavBar from '../NavBar/NavBar';

export default function Signup() {
  const { signup } = useApplicationData();

  return (
    <main>
      <NavBar />
      <h1>Sign Up Page</h1>
      <SignupForm onSignup={signup} />
    </main >
  );
}