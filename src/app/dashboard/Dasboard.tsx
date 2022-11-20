import { compose } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCanvas } from '../ethLogin/EthLogIn';
import { useAppDispatch, useAppSelector } from '../hooks';
import BlockHeightWidget from './BlockHeightWidget';
import { getLatestBlockHeight, getTransactions, selectLatesBlockHeight, selectTransactions } from './dasbooardSlice';
import TransactionsWidget from './TransactionsWidget';

interface Props{
    member: string | null
}


const Dashboard: React.FC<Props> = (props) =>{
    const {member} = props
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const blockHeight = useAppSelector(selectLatesBlockHeight);
    const intervalForBlockHeight = setInterval(()=>{
        dispatch(getLatestBlockHeight())
    },30000)
    useEffect(()=>{
        dispatch(getTransactions())
        dispatch(getLatestBlockHeight())
        if(!member){
            console.log("asdfsa")
            navigate('/')
        }
        return clearInterval(intervalForBlockHeight)
    },[member])
    
    
return (
    <AppCanvas className='space-between'>
        {transactions && <TransactionsWidget walletTransactions={transactions} />}
        {blockHeight && <BlockHeightWidget blockHeight={blockHeight}/>}
    </AppCanvas>
)
}

export default Dashboard