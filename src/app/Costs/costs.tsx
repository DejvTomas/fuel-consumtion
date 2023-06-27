import { useMemo } from "react";
import { IItem } from "../structures/item";

export interface ICostsProps {
    items: IItem[];
}



export function Costs({items}: ICostsProps) {
    const totalPrice = useMemo<string>(()=> {
        const total =  items.map(item => item.price*item.amount).reduce((previous, current) => {
            return previous + current
        }, 0)
        return parseFloat(total.toString()).toFixed();
    }, [items])

    return <div>{totalPrice}</div>
}