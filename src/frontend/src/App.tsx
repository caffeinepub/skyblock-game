import { useInternetIdentity } from './hooks/useInternetIdentity';
import LoginScreen from './components/auth/LoginScreen';
import GameLayout from './components/layout/GameLayout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
          <p className="text-2xl font-bold text-white">Loading Skyblock...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {!identity ? <LoginScreen /> : <GameLayout />}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
