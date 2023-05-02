import Header from "./components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import Body from "./components/Body/Body";
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Body />
    </div>
  );
};

export default App;
