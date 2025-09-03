import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProcessSale: () => void;
  total: number;
}

export const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProcessSale,
  total
}) => {
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
              <p className="text-gray-600">${item.product.price}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-right">
              <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="text-red-500 hover:text-red-700 transition-colors mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-900">Total: ${total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onProcessSale}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Process Sale
        </button>
      </div>
    </div>
  );
};