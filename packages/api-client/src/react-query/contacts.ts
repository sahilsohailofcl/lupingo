import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '../endpoints/contacts';
import { ContactRequest, ContactResponse } from '../types';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getContacts,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};