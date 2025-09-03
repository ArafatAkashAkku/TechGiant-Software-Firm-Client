import { useEffect } from 'react';

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

export const useDocumentHead = (settings: SiteSettings) => {
  useEffect(() => {
    // Update document title
    if (settings.siteName) {
      document.title = settings.siteName;
    }

    // Update or create favicon
    if (settings.faviconUrl) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = settings.faviconUrl;
    }

    // Update meta description
    if (settings.siteDescription) {
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = settings.siteDescription;
    }

    // Update meta keywords
    if (settings.metaKeywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = settings.metaKeywords;
    }

    // Update meta author
    if (settings.metaAuthor) {
      let metaAuthor = document.querySelector('meta[name="author"]') as HTMLMetaElement;
      if (!metaAuthor) {
        metaAuthor = document.createElement('meta');
        metaAuthor.name = 'author';
        document.head.appendChild(metaAuthor);
      }
      metaAuthor.content = settings.metaAuthor;
    }

    // Update Open Graph title
    if (settings.ogTitle) {
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = settings.ogTitle;
    }

    // Update Open Graph description
    if (settings.ogDescription) {
      let ogDescription = document.querySelector(
        'meta[property="og:description"]'
      ) as HTMLMetaElement;
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = settings.ogDescription;
    }

    // Update Open Graph image
    if (settings.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = settings.ogImage;
    }

    // Update Open Graph type
    let ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      ogType.content = 'website';
      document.head.appendChild(ogType);
    }

    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      ogUrl.content = window.location.href;
      document.head.appendChild(ogUrl);
    }
  }, [settings]);
};

export default useDocumentHead;
