"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ParentNavBar from '@/features/parent/ParentNavBar';
import ParentSideBar from '@/features/parent/ParentSideBar';
import { FamilyPerformance } from '@/features/parent/components/FamilyPerformance';
import { parentService } from '@/features/parent/services/parentService';
import { ParentOverview } from '@/features/parent/types';
import { useAuthStore } from '@/store/useAuthStore';

export default function ParentDashboardPage() {
  const [overview, setOverview] = useState<ParentOverview | null>(null);
  const [activeChildId, setActiveChildId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await parentService.getOverview();
        if (!isMounted) return;
        setOverview(response.data);
        setActiveChildId(response.data.children[0]?.id ?? '');
      } catch (requestError: any) {
        if (isMounted) {
          setError(requestError?.message || 'تعذر تحميل لوحة ولي الأمر.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900" dir="rtl">
      <ParentNavBar />
      <div className="flex">
        <ParentSideBar />

        <main className="w-full px-10 py-8">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <FamilyPerformance
            parentName={user?.FName || 'ولي الأمر'}
            children={overview?.children ?? []}
            activeChildId={activeChildId}
            childrenCount={overview?.childrenNumber ?? 0}
            onSelectChild={setActiveChildId}
            onAddChild={() => router.push('/parent/add-child')}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}