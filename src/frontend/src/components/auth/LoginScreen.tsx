import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Sparkles, Play } from 'lucide-react';

export default function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-300 via-orange-400 to-rose-400">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-32 w-32 animate-bounce rounded-3xl bg-white/20 backdrop-blur-sm" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 h-24 w-24 animate-bounce rounded-2xl bg-white/20 backdrop-blur-sm" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-32 left-40 h-28 w-28 animate-bounce rounded-3xl bg-white/20 backdrop-blur-sm" style={{ animationDelay: '1s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-20 right-20 h-20 w-20 animate-bounce rounded-2xl bg-white/20 backdrop-blur-sm" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-yellow-300 opacity-75"></div>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-7xl font-black text-white drop-shadow-lg">
          Block Skylands
        </h1>
        <p className="mb-8 text-2xl font-bold text-white/90 drop-shadow-md">
          Build, Survive, Create on Floating Islands!
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="group relative h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-12 text-xl font-black text-white shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/50 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <div className="mr-3 h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                Connecting...
              </>
            ) : (
              <>
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                Start Playing
              </>
            )}
          </Button>

          <p className="text-sm font-semibold text-white/80">
            Secure login with Internet Identity
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-6 shadow-xl">
            <div className="mb-2 text-4xl">🏝️</div>
            <p className="font-bold text-white">Floating Islands</p>
          </div>
          <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-6 shadow-xl">
            <div className="mb-2 text-4xl">⛏️</div>
            <p className="font-bold text-white">Mine & Build</p>
          </div>
          <div className="rounded-3xl bg-white/20 backdrop-blur-sm p-6 shadow-xl">
            <div className="mb-2 text-4xl">🎨</div>
            <p className="font-bold text-white">Craft Items</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm font-semibold text-white/70">
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
