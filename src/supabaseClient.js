// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとAnonキーを読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabaseクライアントを作成してexport
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
