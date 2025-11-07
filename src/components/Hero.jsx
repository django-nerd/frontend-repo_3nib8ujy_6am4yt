import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-[520px] w-full overflow-hidden">
      {/* Spline 3D cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/no-S8HKPA9ln9-NN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Star-lit gradient veil that keeps scene interactive */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d1a]/30 to-[#0a0d1a] pointer-events-none" />

      {/* Constellation sparkles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-16 h-1.5 w-1.5 rounded-full bg-blue-200/90 shadow-[0_0_12px_theme(colors.blue.200/60)]" />
        <div className="absolute right-20 top-24 h-1 w-1 rounded-full bg-amber-200/90 shadow-[0_0_10px_theme(colors.amber.200/60)]" />
        <div className="absolute left-1/3 bottom-16 h-1 w-1 rounded-full bg-purple-200/90 shadow-[0_0_10px_theme(colors.purple.200/60)]" />
      </div>

      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Wizard's Constellation of Tomes
            </h2>
            <p className="mt-3 text-blue-100/90">
              A luminous archive where star-inked pages whisper and maps of sky-born lore unfold. Curate your own arcane, celestial library.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
