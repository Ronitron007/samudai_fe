import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import { Button } from "reactstrap";
import styled from 'styled-components'; 
import { useAppDispatch, useAppSelector } from "../hooks";
import { getLogInStatus, LogInStatus, myasyncExample } from "./ethLoginSlice";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  

const StyledButton = styled(Button)`
padding: 10px 20px;
max-height: 60px;
margin: 20px;
background-color: #0075cb;
border: none;
border-radius: 10px;
color: white;
font-weight: 500;
font-size:27px;
max-width: fit-content;
align-self: center;
&:hover{
    background-color: #689ff7;
}
`

export const AppCanvas = styled.div`
display: flex;
flex-direction: column;
&.space-between{
    justify-content:space-between;
}

&.center{
    justify-content: center;
}
height:100vh;
`
 
interface Props{
    logInStatus: LogInStatus
}

const LogInwithEth: React.FC<Props> = (props: Props) => {
    const {logInStatus} = props
    const dispatch = useAppDispatch();
    const logInClick = () =>{
        dispatch(myasyncExample("This is a SAMPLE STATEMENT"))
    }
return (
    <AppCanvas className='center'>
    <StyledButton color="primary" className="primary" onClick={()=>logInClick()}> 
    {logInStatus ==="logged_out" ?  "Sign in to eth with Metamask": "Signing In..." } 
    <span className="material-symblols material-icons">wallet</span></StyledButton>
   {logInStatus==="loading" && <div className="py-3 alert alert-danger">"Please Complete the Metamask Log In to continue"</div>}</AppCanvas>
)
}

 export default LogInwithEth;