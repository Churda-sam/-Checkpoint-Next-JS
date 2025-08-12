import { useState } from 'react';
import { useUsers, User } from '@/hooks/useUsers';
import { UserForm } from '@/components/UserForm';
import { UserList } from '@/components/UserList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Users = () => {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleFormSubmit = async (userData: any) => {
    if (editingUser) {
      await updateUser(editingUser.id, userData);
      setEditingUser(null);
    } else {
      await createUser(userData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">User Management System</h1>
            <p className="text-muted-foreground text-lg">
              Complete CRUD operations with Supabase - Create, Read, Update, Delete users
            </p>
          </div>

          {/* Toggle Form Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowForm(!showForm)}
              className="w-48"
            >
              {showForm ? 'Hide Form' : 'Show Form'}
            </Button>
          </div>

          {/* User Form */}
          {showForm && (
            <div className="max-w-md mx-auto">
              <UserForm
                onSubmit={handleFormSubmit}
                initialData={editingUser}
                onCancel={editingUser ? handleCancelEdit : undefined}
                isEditing={!!editingUser}
              />
            </div>
          )}

          <Separator />

          {/* User List */}
          <div className="space-y-4">
            <UserList
              users={users}
              onEdit={handleEdit}
              onDelete={deleteUser}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;