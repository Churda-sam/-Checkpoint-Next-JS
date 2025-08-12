import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // GET: Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // POST: Create a new user
  const createUser = async (userData: CreateUserData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      
      setUsers(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // PUT: Update a user by ID
  const updateUser = async (id: string, userData: UpdateUserData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setUsers(prev => prev.map(user => user.id === id ? data : user));
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove a user by ID
  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setUsers(prev => prev.filter(user => user.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};