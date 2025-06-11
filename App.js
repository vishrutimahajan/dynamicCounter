import {useState, useEffect } from 'react';
import './App.css';
function App() {
  const savedCount = Number(localStorage.getItem('counter'))|| 0;
  const[count,setCount]=useState(savedCount)
  const[step,setStep]=useState(1)
  const[theme,setTheme]=useState('dark')
  const[isAutoCounting,setIsAutoCounting]=useState(false)
    
  useEffect(()=>{
    localStorage.setItem('counter',count)
  }, [count]);

  useEffect(()=>{
    let timer;
    if(isAutoCounting){
      timer =setInterval(()=>{
        setCount(prev => Math.min(prev + step, 100));
      },1000);
    }
    return()=>clearInterval(timer);

  },[isAutoCounting,step]
  );

const increment = () => setCount(prev => Math.min(prev+step,100))
const decrement = () => setCount(prev => Math.max(prev-step,0))
const reset = () => setCount(0);
  const toggleTheme = () => setTheme
           (prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleAuto = () => setIsAutoCounting(prev => !prev);

  return (
    <div className={`app ${theme}`}>
      <h1>DYNAMIC COUNTER APP</h1>
      <h2>Count: {count}</h2>

      <div className='buttons'>
        <button onClick={increment} disabled={count >= 100}>➕ Increment</button>
        <button onClick={decrement} disabled={count <= 0}>➖ Decrement</button>
        <button onClick={reset}>🔀 Reset</button>
      </div>

      <div className='step-control'>
        <label>Step: </label>
        <input type='number'
        value={step}
        onChange={e => setStep(Number(e.target.value))}
        min="1"
        max="20"></input>

        <div className='features'>
          <button onClick={toggleTheme}
           >
           {theme === 'dark'? '☀️Light Mode': '🌙Dark Mode'}</button>
            <button onClick={toggleAuto}>
          {isAutoCounting ? '⏹️ Stop Auto' : '▶️ Start Auto'}
        </button>
       </div>
      </div>
     
    </div>
  );
}

export default App;


/*
import {useState, useEffect } from 'react';
import './App.css';
function App() {
const [time, setTime] = useState(new Date());
  const [isTimer, setTimer] = useState(false);

  const toggleTimer = () => {
    setTimer(prev => !prev);
  };

  useEffect(() => {
    let interval;
    if (isTimer) {
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimer]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div>
      <h1>CURRENT TIME</h1>
      <p>
        Current time: {hours} : {minutes} : {seconds}
      </p>
      <button onClick={toggleTimer}>
        {isTimer ? '⏹️ Stop Timer' : '▶️ Start Timer'}
      </button>
    </div>
  );
}export default App;
*/
