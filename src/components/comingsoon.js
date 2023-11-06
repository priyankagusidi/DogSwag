import React from 'react';
import Link from 'next/link'

function App() {
  return (
    <div className="bg-gradient-to-r from-pink-400 to-purple-600 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-lg p-8 bg-white shadow-md rounded-md text-center">
        <h1 className="text-4xl font-semibold mb-4 font-Jumper">Coming Soon</h1>
        <p className="text-gray-600 mb-6 font-Inter">{`We're working on something amazing. Stay tuned!`}</p>
        <div>
         ⇦ Go to <Link href={"/vetchat"}><span className="text-blue-500">Vet Chat</span></Link>
        </div>
      </div>
    </div>
  );
}

export default App;
