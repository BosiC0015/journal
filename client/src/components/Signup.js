import useApplicationData from "../hooks/useApplicationData";
import SignupForm from "./Forms/SignupForm";

export default function Signup() {
  const { state, signup } = useApplicationData();

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Sign Up Page</h2>
      <SignupForm user={state.user} onSignup={signup} />
    </main>
  );
}