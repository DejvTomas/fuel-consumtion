import { IItem } from "../structures/item";

const localStorageKey = "fuelConsumtionData";

type ConvertedItems = ({date: string} & Omit<IItem, 'date'>)[]

export function setItems(items: IItem[]) {
    const convertedItems: ConvertedItems = items.map(i => {return {...i, date: i.date.toJSON()}});
    localStorage.setItem(localStorageKey, JSON.stringify(convertedItems));
}

export function getItems(): IItem[] {
    const itemsString = localStorage.getItem(localStorageKey);
    if(itemsString) {
        const convertedItems: ConvertedItems = JSON.parse(itemsString);
        return convertedItems.map(i => {return{ ...i, date: new Date(i.date)} })
    }
    return [];
}