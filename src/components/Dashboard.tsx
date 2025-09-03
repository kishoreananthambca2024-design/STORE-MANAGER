import React from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export const Dashboard: React.FC = () => {
  const { products, sales, totalRevenue, getTotalProducts, getTotalSales } = useStore();

  const lowStockProducts = products.filter(product => product.stock < 10);
  const totalProducts = getTotalProducts();
  const totalSalesCount = getTotalSales();

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Sales',
      value: totalSalesCount.toString(),
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Low Stock Items',
      value: lowStockProducts.length.toString(),
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-3">
            {sales.slice(-5).reverse().map((sale) => {
              const product = products.find(p => p.id === sale.productId);
              return (
                <div key={sale.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{product?.name || 'Unknown Product'}</p>
                    <p className="text-sm text-gray-500">Qty: {sale.quantity}</p>
                  </div>
                  <p className="font-semibold text-green-600">${sale.total.toFixed(2)}</p>
                </div>
              );
            })}
            {sales.length === 0 && (
              <p className="text-gray-500 text-center py-4">No sales yet</p>
            )}
          </div>
        </div>

        <div className="bg- rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  {product.stock} left
                </span>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <p className="text-gray-500 text-center py-4">All products are well stocked</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};