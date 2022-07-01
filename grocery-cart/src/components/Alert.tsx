import React, { useEffect } from 'react'
import { Item } from '../interface/item.interface';

interface Props {
    msg: string,
    type: string,
    list: Item[],
    removeAlert: () => void   
}

const Alert: React.FC<Props> = ({ msg, type, list, removeAlert }) => {
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [list])

        return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert