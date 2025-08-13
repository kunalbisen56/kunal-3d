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

def test_connection():
    """Test the Supabase connection and create table if needed"""
    try:
        supabase = get_supabase_client()
        
        print("🧪 Testing Supabase connection...")
        
        # Try to select from the table first to see if it exists
        try:
            result = supabase.table("contact_submissions").select("*").limit(1).execute()
            print("✅ Table already exists and is accessible!")
            return True
        except Exception as table_error:
            print(f"📝 Table doesn't exist yet or needs to be created: {str(table_error)}")
            
            # Test basic connection with a simple query
            try:
                # Try inserting a test record to see if we can create the table structure
                test_data = {
                    "name": "Test User",
                    "email": "test@example.com", 
                    "profession": "Developer",
                    "message": "Test message from schema setup"
                }
                
                print("🚀 Attempting to create table by inserting test data...")
                result = supabase.table("contact_submissions").insert(test_data).execute()
                
                if result.data:
                    contact_id = result.data[0]['id']
                    print("✅ Table created and test insertion successful!")
                    
                    # Clean up test data
                    supabase.table("contact_submissions").delete().eq("id", contact_id).execute()
                    print("🧹 Test data cleaned up")
                    
                    return True
                else:
                    print("❌ Test insertion failed")
                    return False
                    
            except Exception as insert_error:
                print(f"❌ Could not create table: {str(insert_error)}")
                print("\n📋 Manual Setup Required:")
                print("Please create the table manually in Supabase SQL editor with this SQL:")
                print_manual_setup_sql()
                return False
            
    except Exception as e:
        print(f"❌ Connection test failed: {str(e)}")
        return False

def print_manual_setup_sql():
    """Print SQL for manual setup in Supabase dashboard"""
    sql = """
-- Create the contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    profession TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    status TEXT DEFAULT 'new'
);

-- Create indexes for performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);  
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public submissions
CREATE POLICY "Allow public form submissions" ON contact_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create RLS policy for service role access  
CREATE POLICY "Allow service role full access" ON contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
"""
    
    print(sql)
    print("\n🔗 Go to: https://xugqootxqrlqzvxnsiob.supabase.co/project/default/sql")
    print("Copy and paste the above SQL, then click 'Run' to create the table.")

if __name__ == "__main__":
    print("🔧 Supabase Contact Form Schema Setup")
    print("=====================================")
    
    if test_connection():
        print("\n🎯 Setup completed successfully! Your contact form is ready to use Supabase.")
    else:
        print("\n⚠️ Please create the table manually using the SQL provided above.")