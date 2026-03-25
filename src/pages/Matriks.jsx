import React from 'react';
import { useMatrixData } from '../hooks/useMatrixData';
import { MatrixHeader, MatrixFooter } from '../components/Matrix/MatrixHUD';
import MatrixGrid from '../components/Matrix/MatrixGrid';

export default function Matriks() {
  // Panggil Custom Hook (Tidak pakai useOutletContext lagi!)
  const { 
    directives, q1Tasks, q2Tasks, q3Tasks, q4Tasks, 
    profile, isLoading 
  } = useMatrixData();

  return (
    <div className="w-full h-full min-h-[85vh] flex flex-col p-4 md:p-6 lg:p-8 relative overflow-hidden bg-primary/10">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000"></div>

      {/* Komponen Header */}
      <MatrixHeader 
        profile={profile} 
        q1Count={q1Tasks.length} 
        isLoading={isLoading} 
      />

      {/* Komponen Grid 2x2 */}
      <MatrixGrid 
        q1Tasks={q1Tasks} 
        q2Tasks={q2Tasks} 
        q3Tasks={q3Tasks} 
        q4Tasks={q4Tasks} 
        isLoading={isLoading} 
      />

      {/* Komponen Footer */}
      <MatrixFooter 
        totalTasks={directives.length} 
        currentExp={profile?.fuel_cells} 
      />

    </div>
  );
}