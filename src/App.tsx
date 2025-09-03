import React, { useState } from 'react';
import { useStore } from './hooks/useStore';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ProductCatalog } from './components/ProductCatalog';
import { Cart } from './components/Cart';
import { InventoryManager } from './components/InventoryManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const {
    products,
    cart,
    sales,
    totalRevenue,
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
  } = useStore();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <ProductCatalog products={products} onAddToCart={addToCart} />;
      case 'cart':
        return (
          <Cart
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onProcessSale={processSale}
            total={getCartTotal()}
          />
        );
      case 'inventory':
        return (
          <InventoryManager
            products={products}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartItemCount={cartItemCount}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;