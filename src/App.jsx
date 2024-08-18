import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BuyForm from './components/BuyForm';
import HistoryTable from './components/HistoryTable';
function App() {
if(!(localStorage.getItem("budget") || localStorage.getItem("myGold"))){
  localStorage.setItem("budget", "100000000");
  localStorage.setItem("myGold", "10");

}
if( !localStorage.getItem("tableInfo")){
  localStorage.setItem("tableInfo", "[]");

}


  return (
    <>
        <BuyForm/>
        <HistoryTable/>
    </>
  )
}

export default App
