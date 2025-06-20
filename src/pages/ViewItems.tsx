
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ItemModal from "@/components/ItemModal";
import { Card, CardContent } from "@/components/ui/card";

interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdAt: string;
}

const ViewItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Static demo items
  const demoItems: Item[] = [
    {
      id: "demo1",
      name: "Classic White Shirt",
      type: "Shirt",
      description: "A premium cotton white shirt perfect for business meetings and formal occasions. Made from 100% organic cotton with a comfortable fit.",
      coverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1520716498742-4d4b689f6bfa?w=400&h=400&fit=crop"
      ],
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "demo2",
      name: "Running Sneakers",
      type: "Shoes",
      description: "High-performance running shoes with advanced cushioning technology. Perfect for long-distance running and daily workouts.",
      coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
      ],
      createdAt: "2024-01-14T14:30:00Z"
    },
    {
      id: "demo3",
      name: "Fitness Tracker",
      type: "Sports Gear",
      description: "Advanced fitness tracker with heart rate monitoring, GPS tracking, and 7-day battery life. Perfect for monitoring your health and fitness goals.",
      coverImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      additionalImages: [
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
      ],
      createdAt: "2024-01-13T09:15:00Z"
    }
  ];

  useEffect(() => {
    // Get items from localStorage and combine with demo items
    const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
    setItems([...demoItems, ...storedItems]);
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Items Collection</h1>
          <p className="text-lg text-gray-600">Browse and explore your items</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m-3 0v-2a2 2 0 012-2h2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Add your first item to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{item.type}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViewItems;
