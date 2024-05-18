import { useState, useCallback, useEffect, useRef } from "react"

export default function App() {
  const [length, setLength] =  useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "@!%$#*&^"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select();
    //passRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg
    px-5 p-2 my-10 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center text-3xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-3'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder="password"
        readOnly
        ref={passRef}
        />
        <button onClick={copyPassToClipboard}
        className='outline-none bg-blue-700 text-white 
        px-3 py-0.5 shrink-0 font-semibold'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='font-semibold' htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          />
          <label className='font-semibold' htmlFor="numberInput">Numbers</label>
        </div>
        <div className=' flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          />
          <label className='font-semibold' htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </>   
  )
}