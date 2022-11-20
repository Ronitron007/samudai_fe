
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
    margin:10px;
    align-self: flex-end;
    padding:10px;
    >span{
        margin-bottom:10px;
        font-size: medium;
    }
    font-size: 40px;
    font-weight: 600;
`

interface Props{
    blockHeight: number,
    chain_id?: number | "1"
}

const BlockHeightWidget: React.FC<Props> = props =>{
    return <WidgetContainer>
       <span> Latest Block Height for chain_id : {props.chain_id? props.chain_id : 1}:</span>
        <div>
            {props.blockHeight}
        </div>
    </WidgetContainer>
}
export default BlockHeightWidget