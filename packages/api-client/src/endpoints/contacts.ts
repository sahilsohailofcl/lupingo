import { supabase } from '../client';
import { ContactRequest, ContactResponse, ApiResponse } from '../types';

export const contactsApi = {
  async createContact(contact: ContactRequest): Promise<ContactResponse> {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getContacts(): Promise<ContactResponse[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};