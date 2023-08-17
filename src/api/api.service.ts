import {default as axios, AxiosResponse} from 'axios'; 
import { IItem } from "src/app/structures/item";

interface IRawDataItem {
    id:string;
    price:string;
    date:string;
    amount:string;
    tachometer:string
}

export async function fetchConsumptionItems(): Promise<IItem[]> {
    const response = await axios.get<IRawDataItem[]>('http://blank-map.cz/consumption/api/items.php');
    if(response.status === 200) {
        const rawData: IRawDataItem[] = response.data;
        return mapRowDataToIConsumptionItem(rawData);
    }
    return []
}

export async function insertOrUpdate(item: IItem): Promise<IItem[]> {
    const response = await axios.post<IRawDataItem,AxiosResponse<IRawDataItem[]>>('http://blank-map.cz/consumption/api/insert.php', {
        id: item.id || undefined,
        price:item.price.toString(),
        date:item.date.toISOString(),
        amount: item.amount.toString(),
        tachometer:item.tachometer.toString()
    });
    if(response.status === 200) {
        const rawData = response.data;
        return mapRowDataToIConsumptionItem(rawData);
    }
    return []
}

export async function remove(item: IItem): Promise<IItem[]> {
    const response = await axios.post<IRawDataItem,AxiosResponse<IRawDataItem[]>>('http://blank-map.cz/consumption/api/remove.php', {
        id: item.id,
    });
    if(response.status === 200) {
        const rawData = response.data;
        return mapRowDataToIConsumptionItem(rawData);
    }
    return []
}

function mapRowDataToIConsumptionItem(rawData: IRawDataItem[]): IItem[] {
    return rawData.map((raw)=>{
        return {
            id: raw.id,
            date: new Date(raw.date),
            amount: parseFloat(raw.amount),
            price: parseFloat(raw.price),
            tachometer: parseInt(raw.tachometer)
        }
    })
}