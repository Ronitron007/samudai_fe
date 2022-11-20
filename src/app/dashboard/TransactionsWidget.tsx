import moment from "moment";
import React from "react";
import styled from "styled-components";
import { SingleTransaction, transactionAPIresp } from "./dasbooardSlice";




const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #000000;
    font-weight: 500;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: fit-content;
    margin:10px;
`
const Section  = styled.div`
    display: flex;
    &.row{
        flex-direction: row;
    }
    &.col{
        flex-direction: column;
    }
    &.header{
        color: black;
        background-color:#aaa;
        padding:2px;
        margin: 2px;
        border-radius: 2px;
    }
`

interface CustomSpanProps {
    width?:string;
  }

const CustomSpan = styled.span`
    width:${(props:CustomSpanProps) =>props.width ? props.width : '5vw'};

`
interface HeaderProps {
    sections: { name: string, sectionWidth: string }[]
}


const StyledHeader =(props:HeaderProps) =>{
    console.log(typeof(props.sections),Array.isArray(props.sections))
    return (
        <Section className="row header" style={{marginBottom:"10px"}}>
            {props.sections.map((section, index) => { return <CustomSpan key={index} width={section.sectionWidth}>{section.name}</CustomSpan>; })}
        </Section>
    );
}

const TransactionDiv = styled(Section)`
    padding: 2px;
    flex-direction: row;
    margin: 4px;
    background-color: whitesmoke;
    border-radius: 2px;
    max-height: 50px;
    > span{
        max-width:15vw;
        text-overflow: ellipsis;
        margin: 10px;
        overflow: hidden;
        text-align:center;
    }
`
const TransactionsContainer = styled(Section)`
    flex-direction: column;
    color: black;
    max-height: 160px;
    overflow: scroll;
    ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  margin:5px;
  background-color: #0075cb;
  box-shadow:0 0 2px #07273d;
  -webkit-box-shadow: 0 0 2px #07273d;
}
`
interface Props{
    walletTransactions: transactionAPIresp<SingleTransaction[]> 
}

const TransactionsWidget: React.FC<Props> = (props) =>{
    const HeaderProps= [
        {name:"From",sectionWidth:'15vw'},
        {name:"To",sectionWidth:'15vw'},
        {name:"Block",sectionWidth:'15vw'}, 
        {name:"Ago",sectionWidth:'15vw'}]
    let {items} = props.walletTransactions.data
    console.log()
    return (
        <React.Fragment>
    <WidgetContainer>
            <span>Wallet Address : { props.walletTransactions.data.address}</span>
        <StyledHeader sections={HeaderProps} 
        />
    <TransactionsContainer>    
    {items? items.map((transaction,index)=>{
        return <TransactionDiv key={index}>
            <span title={transaction.from_address}>{transaction.from_address}</span>
            <span title={transaction.to_address}>{transaction.to_address}</span>
            <span >{transaction.block_height}</span>
            <span >{moment(transaction.block_signed_at).fromNow()}</span>
            {/* <span>{transaction.}</span> */}
        </TransactionDiv>
    }): null}
    </TransactionsContainer>
        </WidgetContainer> 

        </React.Fragment>
    )
}

export default TransactionsWidget