import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uouuqljphkxwbdzkxjyt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdXVxbGpwaGt4d2Jkemt4anl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDIyMTI4NSwiZXhwIjoyMDM5Nzk3Mjg1fQ.eiU0Yen1JzIkaWJjXc0lxsSxy0iAphEbDAj-GFPWeuEE";
export const supabase = createClient(supabaseUrl, supabaseKey);
