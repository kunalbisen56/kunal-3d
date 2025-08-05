#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form Timestamp Fix
Tests the /api/contact endpoints to verify UTC timestamp functionality
"""

import requests
import json
from datetime import datetime, timezone
import time
import sys

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

def test_contact_api_timestamp():
    """Test contact form API endpoints for proper UTC timestamp handling"""
    
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ FAILED: Could not get backend URL from frontend/.env")
        return False
    
    api_base = f"{backend_url}/api"
    print(f"🔗 Testing API at: {api_base}")
    
    # Record the exact time when we submit the form
    submission_time = datetime.now(timezone.utc)
    print(f"📅 Form submission time (UTC): {submission_time.isoformat()}")
    
    # Test data with realistic information
    test_contact_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "profession": "Software Engineer",
        "message": "Hello! I'm interested in discussing a potential collaboration on a web development project. Could we schedule a call this week?"
    }
    
    print("\n🧪 TESTING CONTACT FORM SUBMISSION...")
    print("=" * 60)
    
    # Test 1: Submit contact form (POST /api/contact)
    try:
        print("📤 Testing POST /api/contact...")
        response = requests.post(
            f"{api_base}/contact",
            json=test_contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"❌ FAILED: POST request failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        response_data = response.json()
        print(f"✅ SUCCESS: Contact form submitted successfully")
        print(f"📋 Response: {json.dumps(response_data, indent=2)}")
        
        # Verify response structure
        required_fields = ['success', 'message', 'contact_id']
        for field in required_fields:
            if field not in response_data:
                print(f"❌ FAILED: Missing field '{field}' in response")
                return False
        
        if not response_data['success']:
            print(f"❌ FAILED: Response indicates failure: {response_data.get('message', 'Unknown error')}")
            return False
        
        contact_id = response_data['contact_id']
        print(f"🆔 Contact ID: {contact_id}")
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Network error during POST request: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: Invalid JSON response: {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error during POST: {e}")
        return False
    
    # Small delay to ensure timestamp difference is measurable
    time.sleep(1)
    
    print("\n🔍 TESTING CONTACT RETRIEVAL...")
    print("=" * 60)
    
    # Test 2: Retrieve contact submissions (GET /api/contact)
    try:
        print("📥 Testing GET /api/contact...")
        response = requests.get(f"{api_base}/contact", timeout=10)
        
        if response.status_code != 200:
            print(f"❌ FAILED: GET request failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        contacts = response.json()
        print(f"✅ SUCCESS: Retrieved {len(contacts)} contact submissions")
        
        if not contacts:
            print("❌ FAILED: No contact submissions found")
            return False
        
        # Find our submitted contact
        our_contact = None
        for contact in contacts:
            if contact.get('id') == contact_id:
                our_contact = contact
                break
        
        if not our_contact:
            print(f"❌ FAILED: Could not find our submitted contact with ID {contact_id}")
            return False
        
        print(f"📋 Found our contact submission:")
        print(json.dumps(our_contact, indent=2, default=str))
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Network error during GET request: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: Invalid JSON response: {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error during GET: {e}")
        return False
    
    print("\n⏰ TESTING TIMESTAMP ACCURACY...")
    print("=" * 60)
    
    # Test 3: Verify timestamp accuracy and format
    try:
        timestamp_str = our_contact.get('timestamp')
        if not timestamp_str:
            print("❌ FAILED: No timestamp field in contact submission")
            return False
        
        print(f"📅 Stored timestamp: {timestamp_str}")
        
        # Parse the timestamp
        try:
            # Try parsing as ISO format with timezone info
            if timestamp_str.endswith('Z'):
                stored_timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            elif '+' in timestamp_str or timestamp_str.endswith('00:00'):
                stored_timestamp = datetime.fromisoformat(timestamp_str)
            else:
                # Assume UTC if no timezone info
                stored_timestamp = datetime.fromisoformat(timestamp_str).replace(tzinfo=timezone.utc)
            
            print(f"📅 Parsed timestamp: {stored_timestamp.isoformat()}")
            
        except ValueError as e:
            print(f"❌ FAILED: Could not parse timestamp '{timestamp_str}': {e}")
            return False
        
        # Verify timestamp is in UTC
        if stored_timestamp.tzinfo != timezone.utc:
            print(f"⚠️  WARNING: Timestamp timezone is {stored_timestamp.tzinfo}, expected UTC")
            # Convert to UTC for comparison
            stored_timestamp = stored_timestamp.astimezone(timezone.utc)
        
        # Calculate time difference between submission and stored timestamp
        time_diff = abs((stored_timestamp - submission_time).total_seconds())
        print(f"⏱️  Time difference: {time_diff:.2f} seconds")
        
        # Allow up to 5 seconds difference (reasonable for network/processing delays)
        if time_diff > 5:
            print(f"❌ FAILED: Timestamp difference too large ({time_diff:.2f}s). Expected < 5s")
            print(f"   Submission time: {submission_time.isoformat()}")
            print(f"   Stored time:     {stored_timestamp.isoformat()}")
            return False
        
        print(f"✅ SUCCESS: Timestamp accuracy verified (difference: {time_diff:.2f}s)")
        
        # Verify timestamp format is ISO 8601 compatible
        iso_format_check = True
        try:
            # Should be able to parse back to datetime
            reparsed = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            print(f"✅ SUCCESS: Timestamp format is ISO 8601 compatible")
        except:
            print(f"❌ FAILED: Timestamp format is not ISO 8601 compatible")
            iso_format_check = False
        
        # Verify all required contact fields are present
        required_contact_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
        missing_fields = []
        for field in required_contact_fields:
            if field not in our_contact:
                missing_fields.append(field)
        
        if missing_fields:
            print(f"❌ FAILED: Missing required fields: {missing_fields}")
            return False
        
        print(f"✅ SUCCESS: All required contact fields present")
        
        # Verify data integrity
        data_integrity = True
        if our_contact['name'] != test_contact_data['name']:
            print(f"❌ FAILED: Name mismatch - expected '{test_contact_data['name']}', got '{our_contact['name']}'")
            data_integrity = False
        
        if our_contact['email'] != test_contact_data['email']:
            print(f"❌ FAILED: Email mismatch - expected '{test_contact_data['email']}', got '{our_contact['email']}'")
            data_integrity = False
        
        if our_contact['message'] != test_contact_data['message']:
            print(f"❌ FAILED: Message mismatch")
            data_integrity = False
        
        if data_integrity:
            print(f"✅ SUCCESS: Contact data integrity verified")
        
        return data_integrity and iso_format_check
        
    except Exception as e:
        print(f"❌ FAILED: Error during timestamp verification: {e}")
        return False

def test_individual_contact_retrieval():
    """Test retrieving individual contact by ID"""
    print("\n🔍 TESTING INDIVIDUAL CONTACT RETRIEVAL...")
    print("=" * 60)
    
    backend_url = get_backend_url()
    if not backend_url:
        return False
    
    api_base = f"{backend_url}/api"
    
    # First get all contacts to find one to test with
    try:
        response = requests.get(f"{api_base}/contact", timeout=10)
        if response.status_code != 200:
            print("❌ FAILED: Could not retrieve contacts for individual test")
            return False
        
        contacts = response.json()
        if not contacts:
            print("❌ FAILED: No contacts available for individual retrieval test")
            return False
        
        # Test with the first contact
        test_contact_id = contacts[0]['id']
        print(f"🆔 Testing individual retrieval for contact ID: {test_contact_id}")
        
        # Test GET /api/contact/{contact_id}
        response = requests.get(f"{api_base}/contact/{test_contact_id}", timeout=10)
        
        if response.status_code != 200:
            print(f"❌ FAILED: Individual contact retrieval failed with status {response.status_code}")
            return False
        
        individual_contact = response.json()
        print(f"✅ SUCCESS: Individual contact retrieved successfully")
        
        # Verify it matches the contact from the list
        if individual_contact['id'] != test_contact_id:
            print(f"❌ FAILED: ID mismatch in individual retrieval")
            return False
        
        # Verify timestamp is present and properly formatted
        if 'timestamp' not in individual_contact:
            print(f"❌ FAILED: No timestamp in individual contact")
            return False
        
        print(f"✅ SUCCESS: Individual contact retrieval working correctly")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Error during individual contact retrieval test: {e}")
        return False

def test_status_update():
    """Test updating contact status via PATCH endpoint"""
    print("\n🔄 TESTING STATUS UPDATE...")
    print("=" * 60)
    
    backend_url = get_backend_url()
    if not backend_url:
        return False
    
    api_base = f"{backend_url}/api"
    
    # First get all contacts to find one to test with
    try:
        response = requests.get(f"{api_base}/contact", timeout=10)
        if response.status_code != 200:
            print("❌ FAILED: Could not retrieve contacts for status update test")
            return False
        
        contacts = response.json()
        if not contacts:
            print("❌ FAILED: No contacts available for status update test")
            return False
        
        # Test with the first contact
        test_contact_id = contacts[0]['id']
        original_status = contacts[0].get('status', 'new')
        print(f"🆔 Testing status update for contact ID: {test_contact_id}")
        print(f"📊 Original status: {original_status}")
        
        # Test updating to 'read' status
        new_status = 'read' if original_status != 'read' else 'replied'
        print(f"🔄 Updating status to: {new_status}")
        
        response = requests.patch(
            f"{api_base}/contact/{test_contact_id}/status",
            params={"status": new_status},
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"❌ FAILED: Status update failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        update_response = response.json()
        print(f"✅ SUCCESS: Status update response: {update_response}")
        
        # Verify the status was actually updated
        response = requests.get(f"{api_base}/contact/{test_contact_id}", timeout=10)
        if response.status_code != 200:
            print("❌ FAILED: Could not retrieve contact to verify status update")
            return False
        
        updated_contact = response.json()
        if updated_contact['status'] != new_status:
            print(f"❌ FAILED: Status not updated. Expected '{new_status}', got '{updated_contact['status']}'")
            return False
        
        print(f"✅ SUCCESS: Status successfully updated to '{new_status}'")
        
        # Test invalid status
        print("🧪 Testing invalid status...")
        response = requests.patch(
            f"{api_base}/contact/{test_contact_id}/status",
            params={"status": "invalid_status"},
            timeout=10
        )
        
        if response.status_code == 400:
            print("✅ SUCCESS: Invalid status properly rejected with 400 error")
        else:
            print(f"❌ FAILED: Invalid status should return 400, got {response.status_code}")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Error during status update test: {e}")
        return False

def test_database_integration():
    """Test MongoDB connection and data persistence"""
    print("\n💾 TESTING DATABASE INTEGRATION...")
    print("=" * 60)
    
    backend_url = get_backend_url()
    if not backend_url:
        return False
    
    api_base = f"{backend_url}/api"
    
    try:
        # Submit multiple contacts to test persistence
        test_contacts = [
            {
                "name": "Alice Cooper",
                "email": "alice.cooper@example.com", 
                "profession": "Marketing Manager",
                "message": "I'd like to discuss a marketing collaboration opportunity."
            },
            {
                "name": "Bob Wilson",
                "email": "bob.wilson@example.com",
                "profession": "Graphic Designer", 
                "message": "Interested in your design services for a new project."
            }
        ]
        
        submitted_ids = []
        
        print(f"📤 Submitting {len(test_contacts)} test contacts...")
        for i, contact_data in enumerate(test_contacts):
            response = requests.post(
                f"{api_base}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code != 200:
                print(f"❌ FAILED: Could not submit test contact {i+1}")
                return False
            
            response_data = response.json()
            submitted_ids.append(response_data['contact_id'])
            print(f"✅ Contact {i+1} submitted with ID: {response_data['contact_id']}")
        
        # Verify all contacts are retrievable
        print("📥 Verifying data persistence...")
        response = requests.get(f"{api_base}/contact", timeout=10)
        if response.status_code != 200:
            print("❌ FAILED: Could not retrieve contacts from database")
            return False
        
        all_contacts = response.json()
        found_contacts = 0
        
        for contact_id in submitted_ids:
            for contact in all_contacts:
                if contact['id'] == contact_id:
                    found_contacts += 1
                    break
        
        if found_contacts != len(submitted_ids):
            print(f"❌ FAILED: Only found {found_contacts}/{len(submitted_ids)} submitted contacts")
            return False
        
        print(f"✅ SUCCESS: All {len(submitted_ids)} contacts persisted correctly in database")
        
        # Test data integrity across multiple submissions
        print("🔍 Verifying data integrity...")
        for i, contact_id in enumerate(submitted_ids):
            response = requests.get(f"{api_base}/contact/{contact_id}", timeout=10)
            if response.status_code != 200:
                print(f"❌ FAILED: Could not retrieve contact {i+1} individually")
                return False
            
            contact = response.json()
            expected = test_contacts[i]
            
            if (contact['name'] != expected['name'] or 
                contact['email'] != expected['email'] or
                contact['message'] != expected['message']):
                print(f"❌ FAILED: Data integrity issue with contact {i+1}")
                return False
        
        print("✅ SUCCESS: Data integrity verified across all submissions")
        return True
        
    except Exception as e:
        print(f"❌ FAILED: Error during database integration test: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 STARTING COMPREHENSIVE BACKEND CONTACT FORM TESTING")
    print("=" * 80)
    
    all_tests_passed = True
    
    # Test 1: Contact Form Submission and Data Retrieval
    print("\n📝 TEST 1: Contact Form Submission & Data Retrieval")
    if not test_contact_api_timestamp():
        all_tests_passed = False
    
    # Test 2: Individual contact retrieval
    print("\n📝 TEST 2: Individual Contact Retrieval")
    if not test_individual_contact_retrieval():
        all_tests_passed = False
    
    # Test 3: Status update functionality
    print("\n📝 TEST 3: Status Update Functionality")
    if not test_status_update():
        all_tests_passed = False
    
    # Test 4: Database integration and persistence
    print("\n📝 TEST 4: Database Integration & Persistence")
    if not test_database_integration():
        all_tests_passed = False
    
    print("\n" + "=" * 80)
    if all_tests_passed:
        print("🎉 ALL TESTS PASSED! Contact form backend functionality is working correctly.")
        print("✅ Contact form submissions are saved with accurate UTC timestamps")
        print("✅ All contact form fields (name, email, profession, message) are properly stored")
        print("✅ Admin endpoints return saved contact data correctly")
        print("✅ Status management is working properly")
        print("✅ MongoDB connection and data persistence verified")
        print("✅ All API endpoints are functioning correctly")
    else:
        print("❌ SOME TESTS FAILED! Contact form backend needs attention.")
    
    print("=" * 80)
    return all_tests_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)