import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCanvas } from '../ethLogin/EthLogIn';

interface Props{
    member: string | null
}



const Dashboard: React.FC<Props> = (props) =>{
    const {member} = props
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(member)
        if(!member){
            console.log("asdfsa")
            navigate('/')
        }
    },[member])
return (
    <AppCanvas>
        <div>HI YOU ARE IN THE DASHBOARD BUDDY!!</div>
    </AppCanvas>
)
}

export default Dashboard