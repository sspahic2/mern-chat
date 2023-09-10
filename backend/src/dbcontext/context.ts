import { createClient } from "@supabase/supabase-js";
import { Database } from "../models/supabase";

const databaseContext = createClient<Database>(
  process.env.DATABASE_URL ?? '',
  process.env.DATABASE_TOKEN ?? ''
);

export default databaseContext;