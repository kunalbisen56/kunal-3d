#!/usr/bin/env python3
"""
Supabase Schema Setup Script
Creates the contact_submissions table and sets up RLS policies
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_supabase_client() -> Client:
    """Get Supabase client with service role key for admin operations"""
    url = os.environ.get("SUPABASE_URL")
    service_role_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    
    if not url or not service_role_key:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    
    return create_client(url, service_role_key)

def setup_database_schema():
    """Set up the database schema for contact form"""
    
    supabase = get_supabase_client()
    
    # Create the contact_submissions table
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        profession TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now(),
        status TEXT DEFAULT 'new'
    );
    """
    
    # Create indexes for performance
    create_indexes_sql = """
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
    """
    
    # Enable Row Level Security
    enable_rls_sql = """
    ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
    """
    
    # Create RLS policies
    create_policies_sql = """
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow public form submissions" ON contact_submissions;
    DROP POLICY IF EXISTS "Allow service role full access" ON contact_submissions;
    
    -- Policy for public form submissions (INSERT only)
    CREATE POLICY "Allow public form submissions" ON contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);
    
    -- Policy for service role full access (for admin operations)
    CREATE POLICY "Allow service role full access" ON contact_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
    """
    
    try:
        print("🚀 Setting up Supabase database schema...")
        
        # Execute table creation
        print("📝 Creating contact_submissions table...")
        result = supabase.rpc("exec_sql", {"sql": create_table_sql}).execute()
        print("✅ Table created successfully")
        
        # Execute indexes creation  
        print("🔍 Creating database indexes...")
        result = supabase.rpc("exec_sql", {"sql": create_indexes_sql}).execute()
        print("✅ Indexes created successfully")
        
        # Enable RLS
        print("🔒 Enabling Row Level Security...")
        result = supabase.rpc("exec_sql", {"sql": enable_rls_sql}).execute()
        print("✅ RLS enabled successfully")
        
        # Create RLS policies
        print("🛡️ Creating security policies...")
        result = supabase.rpc("exec_sql", {"sql": create_policies_sql}).execute()
        print("✅ Security policies created successfully")
        
        print("\n🎉 Database schema setup completed successfully!")
        print("\n📊 Table Structure:")
        print("   - id (UUID, Primary Key)")
        print("   - name (TEXT, Required)")  
        print("   - email (TEXT, Required)")
        print("   - profession (TEXT, Optional)")
        print("   - message (TEXT, Required)")
        print("   - created_at (TIMESTAMPTZ, Auto)")
        print("   - updated_at (TIMESTAMPTZ, Auto)")
        print("   - status (TEXT, Default: 'new')")
        
        return True
        
    except Exception as e:
        print(f"❌ Error setting up database schema: {str(e)}")
        return False

def test_connection():
    """Test the Supabase connection"""
    try:
        supabase = get_supabase_client()
        
        # Test insert a sample record
        test_data = {
            "name": "Test User",
            "email": "test@example.com", 
            "profession": "Developer",
            "message": "Test message from schema setup"
        }
        
        print("🧪 Testing database connection...")
        result = supabase.table("contact_submissions").insert(test_data).execute()
        
        if result.data:
            contact_id = result.data[0]['id']
            print("✅ Test insertion successful!")
            
            # Clean up test data
            supabase.table("contact_submissions").delete().eq("id", contact_id).execute()
            print("🧹 Test data cleaned up")
            
            return True
        else:
            print("❌ Test insertion failed")
            return False
            
    except Exception as e:
        print(f"❌ Connection test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🔧 Supabase Contact Form Schema Setup")
    print("=====================================")
    
    # Setup schema
    if setup_database_schema():
        # Test connection
        if test_connection():
            print("\n🎯 Setup completed successfully! Your contact form is ready to use Supabase.")
        else:
            print("\n⚠️ Schema created but connection test failed. Please check your configuration.")
    else:
        print("\n❌ Schema setup failed. Please check your credentials and try again.")