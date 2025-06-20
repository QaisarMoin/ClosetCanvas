
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdAt: string;
}

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine cover image with additional images
  const allImages = [item.coverImage, ...item.additionalImages].filter(img => img);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleEnquire = () => {
    toast({
      title: "Enquiry Sent!",
      description: `Your enquiry about "${item.name}" has been sent successfully.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {item.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={allImages[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {item.type}
              </Badge>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Item Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Type:</span> {item.type}</p>
                <p><span className="font-medium">Added on:</span> {formatDate(item.createdAt)}</p>
                <p><span className="font-medium">Item ID:</span> {item.id}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleEnquire}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors"
              size="lg"
            >
              Enquire
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
