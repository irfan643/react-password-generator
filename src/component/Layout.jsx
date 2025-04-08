import React, { useCallback,useEffect } from "react";
import { useState } from "react";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/"
     
export default function Layout() {
  let [value, setvalue] = useState(8);
  let [number, number_add] = useState(false);
  let [character, character_add] = useState(false);
  let [password, set_password] = useState("");


  const logChange = useCallback(() => {
      let newPassword = "";
      let pool =letters
      for (let i = 0; i <value; i++) {
        if(number) pool += numbers;
        if(character) pool += specialChars;
        let randomIndex = Math.floor(Math.random() * pool.length);
        newPassword += pool[randomIndex];
      
    }
     set_password(newPassword);  
  }, [number, character,value]);

  function change_value(event) {
    setvalue(event.target.value);
    logChange()
   
  }
  let num = () => {
    number_add(!number);
    logChange ();
  };
  let char = () => {
    character_add(!character);
    logChange() ;
  }
  useEffect(() => {
    logChange();
  }, [logChange]);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      
    });
  };


  return (
    <div className=" w-auto h-auto p-4 bg-blue-400 flex justify-center    rounded-3xl  ">
      <form className="flex  flex-col gap-2">
        <label>password:</label>
        
        <div className="border-2 border-blue-200 flex  justify-between  w-82 p-3  hover:border-blue-600 hover:2 font-semibold rounded-lg">
          <input
            type="text"
            value={password}
            readOnly 
            className=" border-none  outline-none "
          />

                <div onClick={copyToClipboard} className="cursor-pointer ml-2">
            <i className="fa-solid fa-copy hover:text-red-100 active:text-gray-700"></i>
          </div>
        </div>
             
       
        <div className="flex space-x-4">
          <input
            type="range"
            id="increasing "
            min="8"
            max="22"
            onChange={change_value}
          />
          <label>value {value}</label>
          <input type="checkbox" checked={number} onChange={num} />

          <label>Number add</label>
          <input type="checkbox" checked={character} onChange={char} />
          <label>Sepcial character </label>
        </div>
      </form>
    </div>
  );
}
