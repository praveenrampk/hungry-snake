import { SnakeGameLogo } from '@src/assets/image-exporter';

export default function HeaderNoBackground() {
  return (
    <header className="bg-[rgba(20,22,24,255)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <a href="#" className="flex items-center space-x-4">
            <div className="w-8 h-8">
              <img
                src={SnakeGameLogo}
                alt="Hungry snake"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-wider drop-shadow-lg">
              <p className="font-teko">HUNGRY SNAKE</p>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
