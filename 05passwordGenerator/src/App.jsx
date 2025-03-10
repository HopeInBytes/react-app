import { useState, useCallback, useEffect, useRef} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef =useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+-=_{}`";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    } 
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

useEffect(()=>{
  passwordGenerator()
}, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 py-4">
        <h1 className="text-blue-600 font-bold my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-fuchsia-50">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 ">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor=""> Length:{length}</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              className="cursor-pointer"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
