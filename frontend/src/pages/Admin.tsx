import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  profession?: string;
  message: string;
  created_at: string;  // Changed from timestamp to created_at for Supabase
  updated_at: string;  // Added updated_at field
  status: string;
}

const Admin = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/contact`);
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Failed to fetch contact submissions');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (contactId: string, newStatus: string) => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/contact/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Refresh the list
        fetchContacts();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={fetchContacts}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Contact Submissions</h1>
          <p className="text-muted-foreground">
            View and manage contact form submissions from your portfolio website.
          </p>
        </div>

        {contacts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground text-lg">No contact submissions yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Contact form submissions will appear here once visitors start using your contact form.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>{contact.email}</span>
                        {contact.profession && (
                          <>
                            <span>•</span>
                            <span>{contact.profession}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(contact.status)}`}>
                        {contact.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(contact.id, 'read')}
                      className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Mark as Read
                    </button>
                    <button
                      onClick={() => updateStatus(contact.id, 'replied')}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Mark as Replied
                    </button>
                    <a
                      href={`mailto:${contact.email}?subject=Re: Your Message&body=Hi ${contact.name},%0A%0AThank you for reaching out! %0A%0A`}
                      className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;