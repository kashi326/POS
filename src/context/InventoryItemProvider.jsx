// 1
import React, { createContext, useState, useContext } from 'react';

// 2
const InventoryItemContext = createContext()
export const useInventoryItems = () => useContext(InventoryItemContext)

export default function InventoryItemProvider({ children}) {
    let initialItems = [
        
    ];
    // 3
    const [items, setItems] = useState(initialItems)

    // 4
    const addItem = item =>
        setItems([
            ...items,
            {
                id: items.length + 1,
                serialNumber: item.serialNumber,
                name: item.name
            }
        ]);

    function updateItem(item, itemId){
        // alert('hello' + index)
        let bItems = items.map(itm => {
            return itm.id === itemId ? item : itm;
        });
        // bItems.splice(index, 1);
        setItems(bItems);
    }
    function cancelSalesList(){
        setItems([]);
    }

    function removeItem(index) {
        let bItems = [...items];
        bItems.splice(index, 1);
        setItems(bItems);
    }

    // 6
    return (
        <InventoryItemContext.Provider value={{ items, addItem, removeItem, updateItem,cancelSalesList }}>
            {children}
        </InventoryItemContext.Provider>
    )
}
