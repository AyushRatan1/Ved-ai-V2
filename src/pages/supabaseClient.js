import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://avuzohqeyksebldfbsox.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2dXpvaHFleWtzZWJsZGZic294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1Mzk0MTYsImV4cCI6MjA0MTExNTQxNn0.wZCnNtB6yYrIVQuN8JYgXNZCaYdt7BTSMVlgwCUbXkw";
export const supabase = createClient(supabaseUrl, supabaseKey);
