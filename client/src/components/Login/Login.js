import useApplicationData from "../../hooks/useApplicationData";
import LoginForm from "../Forms/LoginForm";
import "./Login.scss"
import NavBar from '../NavBar/NavBar';

export default function Login() {
  const { login } = useApplicationData();

  return (
    <main>
      <NavBar />
      <h2>Login Page</h2>
      <LoginForm onLogin={login} />
    </main>
  );
}