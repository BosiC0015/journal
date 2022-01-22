import useApplicationData from "../../hooks/useApplicationData";
import LoginForm from "../Forms/LoginForm";
import "./Login.scss"
import NavBar from '../NavBar/NavBar';

export default function Login() {
  const { login } = useApplicationData();
  // Login page
  return (
    <main>
      <NavBar />
      <h1>Login Page</h1>
      <LoginForm onLogin={login} />
    </main>
  );
}