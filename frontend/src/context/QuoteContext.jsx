import React, { createContext, useState, useContext, useEffect } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
    const saved = localStorage.getItem('srplastic_quote_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('srplastic_quote_cart', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToQuote = (product, quantity = 1) => {
    setQuoteItems((prev) => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: parseInt(item.quantity || 0) + parseInt(quantity) }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromQuote = (productId) => {
    setQuoteItems((prev) => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setQuoteItems((prev) =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: parseInt(quantity) || 1 } : item
      )
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const quoteCount = quoteItems.reduce((acc, item) => acc + parseInt(item.quantity || 1), 0);

  return (
    <QuoteContext.Provider value={{
      quoteItems,
      addToQuote,
      removeFromQuote,
      updateQuantity,
      clearQuote,
      quoteCount
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
