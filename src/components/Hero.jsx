import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/no-S8HKPA9ln9-NN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a]/20 via-[#0b0b1a]/30 to-[#0b0b1a] pointer-events-none" />

      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              A Catalog of Luminous Tomes
            </h2>
            <p className="mt-3 text-white/80">
              Wander through an illuminated archive of stories where pages shimmer and lore breathes. Curate, read, and tend to your private constellation of books.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
