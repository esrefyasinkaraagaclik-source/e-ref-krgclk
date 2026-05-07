import React, { createContext, useContext } from 'react';
import { Theme } from '../types/curriculum';
import { curriculum } from '../data/curriculum';

interface CurriculumContextType {
  themes: Theme[];
  loading: boolean;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export function CurriculumProvider({ children }: { children: React.ReactNode }) {
  return (
    <CurriculumContext.Provider value={{ themes: curriculum as unknown as Theme[], loading: false }}>
      {children}
    </CurriculumContext.Provider>
  );
}

export const useCurriculum = () => {
  const context = useContext(CurriculumContext);
  if (context === undefined) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
};
