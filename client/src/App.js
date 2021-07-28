import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
};

export default App;
