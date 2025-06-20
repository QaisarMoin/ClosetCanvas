
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Item Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize, manage, and showcase your items with our intuitive platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">View Items</h3>
              <p className="text-gray-600 mb-6">
                Browse through your collection of items with detailed views and easy navigation
              </p>
              <Link to="/view-items">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                  View Items
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Items</h3>
              <p className="text-gray-600 mb-6">
                Add new items to your collection with detailed information and multiple images
              </p>
              <Link to="/add-items">
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                  Add Items
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
