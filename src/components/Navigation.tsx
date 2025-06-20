
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            ItemManager
          </Link>
          <div className="flex space-x-4">
            <Link to="/view-items">
              <Button 
                variant={location.pathname === "/view-items" ? "default" : "outline"}
                className="transition-all duration-200"
              >
                View Items
              </Button>
            </Link>
            <Link to="/add-items">
              <Button 
                variant={location.pathname === "/add-items" ? "default" : "outline"}
                className="transition-all duration-200"
              >
                Add Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
