import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import LogInwithEth from './app/ethLogin/EthLogIn';
import { useAppSelector } from './app/hooks';
import { getLogInStatus, getMember } from './app/ethLogin/ethLoginSlice';
import Dashboard from './app/dashboard/Dasboard';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  const logInStatus = useAppSelector(getLogInStatus);
  const member = useAppSelector(getMember);
  const navigate = useNavigate();

  useEffect(() => {
    if(member){
    navigate(`/home`)}
  },[member])
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInwithEth logInStatus={logInStatus} />} />
        <Route path={`/home`} element={<Dashboard member={member}/>} />
      </Routes>
    </div>
  );
}

export default App;
