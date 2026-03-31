'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const shlokas = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    hinglish: "Tera adhikaar sirf karma karne par hai, uske phal (result) par nahi.",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    reference: "Chapter 2, Verse 47"
  },
  {
    sanskrit: "योगस्थ: कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    transliteration: "Yogasthah kuru karmani sangam tyaktva dhananjaya",
    hinglish: "Yoga mein sthit hokar apna karma karo, phal ki chinta chhod kar.",
    translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure.",
    reference: "Chapter 2, Verse 48"
  },
  {
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
    transliteration: "Yoda yada hi dharmasya glanir bhavati bharata",
    hinglish: "Jab bhi dharma ki haani hoti hai, tab main avataar leta hoon.",
    translation: "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharat, then I manifest Myself.",
    reference: "Chapter 4, Verse 7"
  },
  {
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।",
    transliteration: "Nainam chhindanti shastrani nainam dahati pavakah",
    hinglish: "Atma ko na shastra kaat sakte hain, na agni jala sakti hai.",
    translation: "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
    reference: "Chapter 2, Verse 23"
  },
  {
    sanskrit: "श्रद्धावाँल्लभते ज्ञानं तत्पर: संयतेन्द्रिय:।",
    transliteration: "Shraddhavan labhate jnanam tat-parah samyatendriyah",
    hinglish: "Shraddha rakhne wala hi gyaan praapt karta hai.",
    translation: "A faithful man who is dedicated to transcendental knowledge and who subdues his senses is eligible to achieve such knowledge.",
    reference: "Chapter 4, Verse 39"
  }
];

export default function ShlokaBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shlokas.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white/40 backdrop-blur-sm border border-primary/10 rounded-3xl p-8 shadow-inner overflow-hidden relative">
      <div className="absolute top-4 right-4 text-primary/10">
        <BookOpen size={64} />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 relative z-10"
        >
          <p className="text-primary font-display font-bold text-2xl leading-relaxed">{shlokas[current].sanskrit}</p>
          <div className="space-y-1">
            <p className="text-foreground/60 italic text-xs font-ui tracking-wider">{shlokas[current].transliteration}</p>
            <p className="text-secondary font-bold text-sm font-sans italic">&quot;{shlokas[current].hinglish}&quot;</p>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed text-base">{shlokas[current].translation}</p>
          <div className="flex items-center gap-3 pt-4">
             <div className="h-px w-12 bg-primary/30" />
             <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold font-ui">{shlokas[current].reference}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
