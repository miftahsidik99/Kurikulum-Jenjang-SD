import { useState } from 'react';
import LandingPage from './components/LandingPage';
import IdentityForm from './components/IdentityForm';
import SelectionForm from './components/SelectionForm';
import DocumentView from './components/DocumentView';
import { IdentityData, SelectionData } from './types';

type ViewState = 'landing' | 'identity' | 'selection' | 'document';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  const [identityState, setIdentityState] = useState<IdentityData | undefined>();
  const [selectionState, setSelectionState] = useState<SelectionData | undefined>();

  const handleEnterApp = () => {
    setCurrentView('identity');
  };

  const handleSaveIdentity = (data: IdentityData) => {
    setIdentityState(data);
    setCurrentView('selection');
  };

  const handleSaveSelection = (data: SelectionData) => {
    setSelectionState(data);
    setCurrentView('document');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {currentView === 'landing' && <LandingPage onEnter={handleEnterApp} />}
      
      {currentView !== 'landing' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          <div className="mb-8 flex justify-center items-center space-x-2 md:space-x-4 text-sm font-medium">
             <div className={`px-4 py-2 rounded-full ${currentView === 'identity' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1. Identitas</div>
             <div className="w-8 h-px bg-slate-300 hidden md:block"></div>
             <div className={`px-4 py-2 rounded-full ${currentView === 'selection' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2. Pilih Dokumen</div>
             <div className="w-8 h-px bg-slate-300 hidden md:block"></div>
             <div className={`px-4 py-2 rounded-full ${currentView === 'document' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3. Hasil & Export</div>
          </div>

          <main>
            {currentView === 'identity' && (
              <IdentityForm 
                initialData={identityState} 
                onSave={handleSaveIdentity} 
              />
            )}
            
            {currentView === 'selection' && (
              <SelectionForm 
                initialData={selectionState} 
                onSave={handleSaveSelection} 
                onBack={() => setCurrentView('identity')}
              />
            )}

            {currentView === 'document' && identityState && selectionState && (
              <DocumentView 
                identity={identityState} 
                selection={selectionState} 
                onBack={() => setCurrentView('selection')}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}
