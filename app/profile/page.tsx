'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ContactAndFooter';
import { User, Mail, Phone, Building, MapPin, Save, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

interface UserProfile {
  displayName: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  bio: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [profileData, setProfileData] = useState<UserProfile>({
    displayName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadUserProfile = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // Load from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileData({
          displayName: user.displayName || userData.displayName || '',
          email: user.email || userData.email || '',
          phone: userData.phone || '',
          company: userData.company || '',
          location: userData.location || '',
          bio: userData.bio || '',
        });
      } else {
        // Initialize with Firebase Auth data
        setProfileData({
          displayName: user.displayName || '',
          email: user.email || '',
          phone: '',
          company: '',
          location: '',
          bio: '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to Firebase Auth data
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: '',
        company: '',
        location: '',
        bio: '',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && isClient) {
      if (!user) {
        router.push('/login?callbackUrl=/profile');
      } else {
        loadUserProfile();
      }
    }
  }, [user, loading, router, isClient, loadUserProfile]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      // Update Firebase Auth displayName
      if (auth.currentUser && profileData.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: profileData.displayName
        });
      }

      // Save to Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        email: profileData.email,
        displayName: profileData.displayName,
        phone: profileData.phone,
        company: profileData.company,
        location: profileData.location,
        bio: profileData.bio,
        updatedAt: serverTimestamp(),
        createdAt: (await getDoc(userDocRef)).exists() 
          ? (await getDoc(userDocRef)).data()?.createdAt 
          : serverTimestamp(),
      }, { merge: true });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile. Please try again.' 
      });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isClient || loading || isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              My Profile
            </h1>
            <p className="text-gray-400">Manage your account information and preferences</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-sky-500/15 border border-sky-400/40 text-sky-300' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Profile Information Card */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-light mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Profile Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                    placeholder="Enter your full name"
                    required
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
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                    disabled
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={profileData.company}
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                    Bio / About Me
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="bg-dark-200 border border-dark-300 text-light w-full p-3 rounded-md focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-secondary hover:from-sky-300 hover:to-indigo-400 text-dark font-bold py-3 px-8 rounded-md transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

