import { useEffect } from 'react';
import { useAppStore } from '../store/app-store';
import { AYAH_BANNER_DATA } from '../data/islamic/ayah-banner-data';

export function useAyahBanner(key) {
  const setAyahBannerData = useAppStore((s) => s.setAyahBannerData);
  const clearAyahBannerData = useAppStore((s) => s.clearAyahBannerData);

  useEffect(() => {
    const data = key ? AYAH_BANNER_DATA[key] : null;
    setAyahBannerData(data);
    return () => clearAyahBannerData();
  }, [key, setAyahBannerData, clearAyahBannerData]);
}
