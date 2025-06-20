
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdAt: string;
}

const AddItems = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const itemTypes = [
    "Shirt",
    "Pant", 
    "Shoes",
    "Sports Gear",
    "Accessories",
    "Electronics",
    "Books",
    "Other"
  ];

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    let coverImageBase64 = "/placeholder.svg";
    let additionalImagesBase64: string[] = [];

    if (coverImage) {
      coverImageBase64 = await handleFileToBase64(coverImage);
    }

    if (additionalImages.length > 0) {
      additionalImagesBase64 = await Promise.all(
        additionalImages.map(file => handleFileToBase64(file))
      );
    }

    const newItem: Item = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage: coverImageBase64,
      additionalImages: additionalImagesBase64,
      createdAt: new Date().toISOString()
    };

    // Get existing items from localStorage
    const existingItems = JSON.parse(localStorage.getItem("items") || "[]");
    const updatedItems = [...existingItems, newItem];
    localStorage.setItem("items", JSON.stringify(updatedItems));

    toast({
      title: "Success!",
      description: "Item successfully added",
    });

    // Reset form
    setFormData({
      name: "",
      type: "",
      description: "",
    });
    setCoverImage(null);
    setAdditionalImages([]);

    // Navigate to view items after a short delay
    setTimeout(() => {
      navigate("/view-items");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (type === 'cover' && imageFiles.length > 0) {
      setCoverImage(imageFiles[0]);
    } else if (type === 'additional') {
      setAdditionalImages(prev => [...prev, ...imageFiles.slice(0, 3 - prev.length)]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (type === 'cover' && imageFiles.length > 0) {
      setCoverImage(imageFiles[0]);
    } else if (type === 'additional') {
      setAdditionalImages(prev => [...prev, ...imageFiles.slice(0, 3 - prev.length)]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Add New Item</CardTitle>
            <p className="text-gray-600">Fill in the details to add a new item to your collection</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter item name"
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">Item Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Item Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your item in detail..."
                  className="min-h-[100px] transition-all focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Cover Image</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver === 'cover' ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={(e) => handleDragOver(e, 'cover')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'cover')}
                >
                  {coverImage ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt="Cover preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600">{coverImage.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCoverImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Drop your cover image here</p>
                        <p className="text-sm text-gray-500">or</p>
                        <label htmlFor="cover-file" className="cursor-pointer">
                          <Button type="button" variant="outline" asChild>
                            <span>Select from device</span>
                          </Button>
                          <input
                            id="cover-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileSelect(e, 'cover')}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Additional Images (Optional)</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver === 'additional' ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragOver={(e) => handleDragOver(e, 'additional')}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'additional')}
                >
                  {additionalImages.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {additionalImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Additional ${index + 1}`}
                              className="h-24 w-24 object-cover rounded-lg mx-auto"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {additionalImages.length < 3 && (
                        <label htmlFor="additional-files" className="cursor-pointer">
                          <Button type="button" variant="outline" asChild>
                            <span>Add more images</span>
                          </Button>
                          <input
                            id="additional-files"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileSelect(e, 'additional')}
                          />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium">Drop additional images here</p>
                        <p className="text-sm text-gray-500">Up to 3 images, or</p>
                        <label htmlFor="additional-files" className="cursor-pointer">
                          <Button type="button" variant="outline" asChild>
                            <span>Select from device</span>
                          </Button>
                          <input
                            id="additional-files"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileSelect(e, 'additional')}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Add Item
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddItems;
