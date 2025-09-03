import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isCartView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  isCartView = false 
}) => {
  const isLowStock = product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
            Low Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <span className="text-lg font-bold text-blue-600">${product.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {product.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Package className="w-4 h-4 mr-1" />
            <span>{product.stock} in stock</span>
          </div>
        </div>

        {!isCartView && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{product.sales} sold</span>
            <button
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock}
              className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                isOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};