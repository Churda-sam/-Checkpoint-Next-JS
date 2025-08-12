import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateUserData, UpdateUserData, User } from '@/hooks/useUsers';

interface UserFormProps {
  onSubmit: (data: CreateUserData | UpdateUserData) => Promise<void>;
  initialData?: User | null;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const UserForm = ({ onSubmit, initialData, onCancel, isEditing = false }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    age: initialData?.age?.toString() || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : undefined,
      };
      
      await onSubmit(userData);
      
      // Reset form if creating new user
      if (!isEditing) {
        setFormData({ name: '', email: '', age: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit User' : 'Add New User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              placeholder="Enter user's name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              placeholder="Enter user's email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Enter user's age"
              min="1"
              max="120"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : (isEditing ? 'Update User' : 'Create User')}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};