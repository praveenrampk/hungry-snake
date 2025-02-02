import React from 'react';

export default function ApplicationBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-32">
      <div className="fixed inset-0 bg-[rgba(20,22,24,255)] flex items-center justify-center p-10">
        <div className="w-full h-[90vh] max-w-6xl bg-[rgba(36,39,42,255)] shadow-lg p-10">
          <div className="h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              {children}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
