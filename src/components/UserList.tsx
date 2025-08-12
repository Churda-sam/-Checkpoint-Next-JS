import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, User as UserIcon } from 'lucide-react';
import { User } from '@/hooks/useUsers';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const UserList = ({ users, onEdit, onDelete, loading }: UserListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading users...</div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <UserIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No users found. Create your first user above!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <CardHeader className="px-0 pb-4">
        <CardTitle>All Users ({users.length})</CardTitle>
      </CardHeader>
      
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  {user.age && (
                    <Badge variant="secondary">{user.age} years old</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="text-sm text-muted-foreground">
                  <p>Created: {formatDate(user.created_at)}</p>
                  {user.updated_at !== user.created_at && (
                    <p>Updated: {formatDate(user.updated_at)}</p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(user)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === user.id}
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === user.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {user.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(user.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete User
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};