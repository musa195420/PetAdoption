const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // 👈 Use this, not anon key
);

console.log("✅ Supabase initialized with service role key");

module.exports = supabase;