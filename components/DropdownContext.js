import React, { createContext, useState } from 'react';

export const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [stores, setStores] = useState(['Sklavenitis', 'Lidl', 'Alpahmega', 'Poplife']);
  const [productNames, setProductNames] = useState([
    'Apple Juice',
    'Orange Juice',
    'Milk',
    'Bread',
    'Cheese',
    'Eggs',
    'Yogurt',
    'Pasta',
    'Tomato Sauce',
    'Chicken',
  ]);
  const [categories, setCategories] = useState(['Pasta', 'Bread', 'Dairy', 'Fruits', 'Vegetables']);

  return (
    <DropdownContext.Provider
      value={{
        stores,
        productNames,
        categories,
        setStores,
        setProductNames,
        setCategories,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
