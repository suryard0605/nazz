'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CTAButton() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-20 gap-8">
      <p
        className="text-3xl sm:text-5xl font-semibold text-center px-6"
        style={{ color: '#f8a5c2', textShadow: '0 0 20px rgba(248,165,194,0.5)' }}
      >
        Happy 4th Anniversary ❤️
      </p>
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onClick={() => router.push('/home')}
        className="px-10 py-4 rounded-full text-lg font-semibold text-black cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #f8a5c2, #e84393)',
          boxShadow: '0 0 30px rgba(248,165,194,0.5)',
        }}
        whileHover={{ scale: 1.06, boxShadow: '0 0 45px rgba(248,165,194,0.8)' }}
        whileTap={{ scale: 0.97 }}
      >
        Start Our Story
      </motion.button>
    </div>
  );
}
