import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Wilder from './components/Wilder';
import AddWilder from './components/AddWilder';
// import WildersData from './data/WildersData';

const App = () => {
  // const [counter, setCounter] = useState(0);
  const [wilders, setWilders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/wilder');
      console.log(result.data);
      setWilders(result.data);
    };

    fetchData();
  }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>currently at {counter}</p>
    //     <button onClick={() => setCounter(counter + 1)}>+1</button>
    //   </header>
    // </div>
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <AddWilder />
        <h2>Wilders</h2>
        <section className="card-row">
          {wilders.reverse().map((wilder) => (
            <Wilder 
              key = {wilder.id}
              name = {wilder.name} 
              skills = {wilder.skills} 
              id = {wilder.id}
            />
          ))}
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2023 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
