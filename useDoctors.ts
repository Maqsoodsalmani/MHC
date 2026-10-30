import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Doctor } from '@/lib/types';

type DoctorsState =
  | { status: 'loading'; doctors: [] }
  | { status: 'ready'; doctors: Doctor[] }
  | { status: 'error'; doctors: [] };

export type DoctorDirectory = ReturnType<typeof useDoctors>;

export function useDoctors() {
  const [state, setState] = useState<DoctorsState>({ status: 'loading', doctors: [] });

  const load = useCallback(async () => {
    setState({ status: 'loading', doctors: [] });
    const { data, error } = await supabase
      .from('doctors')
      .select('id, name, specialty, qualification, experience_years, bio, working_days')
      .order('name');
    if (error || !Array.isArray(data)) {
      setState({ status: 'error', doctors: [] });
      return;
    }
    setState({ status: 'ready', doctors: data as Doctor[] });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
