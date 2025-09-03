import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useDocumentHead from '../hooks/useDocumentHead';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  metaKeywords: string;
  metaAuthor: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

interface SiteSettingsContextProps {
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
  loadSiteSettings: () => void;
}

const defaultSiteSettings: SiteSettings = {
  siteName: 'TechGiant Software Firm',
  siteDescription:
    'Leading software development company providing innovative solutions for businesses worldwide.',
  logoUrl: '',
  faviconUrl: '/favicon.ico',
  metaKeywords: 'software development, web development, mobile apps, technology solutions',
  metaAuthor: 'TechGiant Software Firm',
  ogTitle: 'TechGiant Software Firm - Innovative Software Solutions',
  ogDescription:
    'Leading software development company providing innovative solutions for businesses worldwide.',
  ogImage: '',
};

const SiteSettingsContext = createContext<SiteSettingsContextProps | undefined>(undefined);

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

interface SiteSettingsProviderProps {
  children: ReactNode;
}

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  // Apply document head changes whenever settings change
  useDocumentHead(siteSettings);

  const loadSiteSettings = () => {
    try {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSiteSettings({ ...defaultSiteSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
      setSiteSettings(defaultSiteSettings);
    }
  };

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    const updatedSettings = { ...siteSettings, ...newSettings };
    setSiteSettings(updatedSettings);

    // Save to localStorage
    try {
      localStorage.setItem('siteSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving site settings:', error);
    }
  };

  // Load settings on component mount
  useEffect(() => {
    loadSiteSettings();
  }, []);

  const contextValue: SiteSettingsContextProps = {
    siteSettings,
    updateSiteSettings,
    loadSiteSettings,
  };

  return (
    <SiteSettingsContext.Provider value={contextValue}>{children}</SiteSettingsContext.Provider>
  );
};

export default SiteSettingsProvider;
