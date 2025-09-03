import { useState, useEffect } from 'react';
import { Product, CartItem, Sale, StoreState } from '../types';
import { initialProducts } from '../data/products';

const STORAGE_KEY = 'store-manager-data';

export const useStore = () => {
  const [state, setState] = useState<StoreState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Calculate initial total revenue
    const totalRevenue = initialProducts.reduce((sum, product) => 
      sum + (product.sales * product.price), 0
    );
    
    return {
      products: initialProducts,
      cart: [],
      sales: [],
      totalRevenue
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      return {
        ...prev,
        cart: [...prev.cart, { product, quantity }]
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.product.id !== productId)
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  };

  const processSale = () => {
    const total = state.cart.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
    
    const newSales = state.cart.map(item => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      productId: item.product.id,
      quantity: item.quantity,
      total: item.product.price * item.quantity,
      date: new Date().toISOString()
    }));

    setState(prev => ({
      ...prev,
      sales: [...prev.sales, ...newSales],
      totalRevenue: prev.totalRevenue + total,
      products: prev.products.map(product => {
        const cartItem = prev.cart.find(item => item.product.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: product.stock - cartItem.quantity,
            sales: product.sales + cartItem.quantity
          };
        }
        return product;
      }),
      cart: []
    }));
  };

  const addProduct = (product: Omit<Product, 'id' | 'sales'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      sales: 0
    };
    
    setState(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== id),
      cart: prev.cart.filter(item => item.product.id !== id)
    }));
  };

  const getTotalProducts = () => state.products.length;
  
  const getTotalSales = () => state.sales.reduce((sum, sale) => sum + sale.quantity, 0);
  
  const getCartTotal = () => state.cart.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return {
    ...state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    processSale,
    addProduct,
    updateProduct,
    deleteProduct,
    getTotalProducts,
    getTotalSales,
    getCartTotal
  };
};