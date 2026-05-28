'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';
import { Settings, User, Mail, Lock, Save, Bell, Globe } from 'lucide-react';

export default function ClientAdminSettingsPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form state
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    company: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    language: 'en',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && isClient) {
      if (!user || !isAdmin) {
        router.push('/login?callbackUrl=/client-admin/settings');
      } else {
        // Load user data
        setProfileData({
          displayName: user.displayName || '',
          email: user.email || '',
          phone: '',
          company: '',
        });
      }
    }
  }, [user, isAdmin, loading, router, isClient]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // TODO: Implement profile update logic
      // This would typically update Firebase Auth and Firestore
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // TODO: Implement preferences update logic
      // This would typically save to Firestore
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSaveMessage({ type: 'success', text: 'Preferences saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setSaveMessage({ type: 'error', text: 'Failed to save preferences. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isClient || loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebarClient />
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-light mb-2 flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              Settings
            </h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>

          {saveMessage && (
            <div className={`mb-6 p-4 rounded-md ${
              saveMessage.type === 'success' 
                ? 'bg-sky-500/15 border border-sky-400/40 text-sky-300' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}>
              {saveMessage.text}
            </div>
          )}

          {/* Profile Settings */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-light">Profile Information</h2>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleProfileChange}
                  className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Company name"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>

          {/* Preferences */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-secondary" />
              <h2 className="text-xl font-bold text-light">Preferences</h2>
            </div>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotifications" className="block text-sm font-medium text-light mb-1">
                    Email Notifications
                  </label>
                  <p className="text-xs text-gray-400">Receive email updates about your account</p>
                </div>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  className="w-5 h-5 text-primary bg-dark-200 border-dark-300 rounded focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="smsNotifications" className="block text-sm font-medium text-light mb-1">
                    SMS Notifications
                  </label>
                  <p className="text-xs text-gray-400">Receive SMS updates (requires phone number)</p>
                </div>
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={preferences.smsNotifications}
                  onChange={handlePreferenceChange}
                  className="w-5 h-5 text-primary bg-dark-200 border-dark-300 rounded focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="weeklyReports" className="block text-sm font-medium text-light mb-1">
                    Weekly Reports
                  </label>
                  <p className="text-xs text-gray-400">Receive weekly summary reports</p>
                </div>
                <input
                  type="checkbox"
                  id="weeklyReports"
                  name="weeklyReports"
                  checked={preferences.weeklyReports}
                  onChange={handlePreferenceChange}
                  className="w-5 h-5 text-primary bg-dark-200 border-dark-300 rounded focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                  className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-light">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-light mb-2">Change Password</h3>
                <p className="text-sm text-gray-400 mb-4">Update your password to keep your account secure</p>
                <button
                  type="button"
                  className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-medium py-2 px-4 rounded-md transition-all"
                  onClick={() => {
                    // TODO: Implement password change functionality
                    alert('Password change functionality will be implemented soon.');
                  }}
                >
                  Change Password
                </button>
              </div>

              <div className="pt-4 border-t border-dark-300">
                <h3 className="text-lg font-semibold text-light mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button
                  type="button"
                  className="bg-transparent border border-secondary text-secondary hover:bg-secondary/10 font-medium py-2 px-4 rounded-md transition-all"
                  onClick={() => {
                    // TODO: Implement 2FA functionality
                    alert('Two-factor authentication will be implemented soon.');
                  }}
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

