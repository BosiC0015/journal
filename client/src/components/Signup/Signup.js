import useUserData from "../../hooks/useUserData";
import SignupForm from "../Forms/SignupForm";
import NavBar from '../NavBar/NavBar';

export default function Signup() {
  const { signup } = useUserData();
  // Signup page
  return (
    <main>
      <NavBar />
      <SignupForm onSignup={signup} />
    </main >
  );
}