import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfnzhdgmjzduhlakhebt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Mu4vmxlb8fwtb3JNX_ADuQ_ea0XzM6M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side, use service role
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_wlOvhcf-V74DdXJ6AFoD8w_GfIqTNqb';
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
