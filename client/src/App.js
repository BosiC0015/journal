
import './App.css';
import NavBar from './components/NavBar/NavBar';
import RenderSidebar from './components/Sidebar/RenderSidebar.js';
import Calendar from './components/Calendar/Calendar';
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const { state } = useApplicationData();

  return (
    <div className="App">
      <NavBar />
      <div className='demo-app'>
        <RenderSidebar />
        <div className='demo-app-main'>
          <Calendar
            weekendsVisible={state.weekendsVisible}
          />
        </div>
      </div>
    </div>
  );

}


export default App;
