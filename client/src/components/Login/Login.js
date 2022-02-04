import useUserData from "../../hooks/useUserData";
import LoginForm from "../Forms/LoginForm";
import NavBar from '../NavBar/NavBar';

export default function Login() {
  const { login } = useUserData();
  // Login page
  return (
    <main>
      <NavBar />
      <LoginForm onLogin={login} />
    </main>
  );
}