'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const shlokas = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    reference: "Chapter 2, Verse 47"
  },
  {
    sanskrit: "योगस्थ: कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    transliteration: "Yogasthah kuru karmani sangam tyaktva dhananjaya",
    translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure.",
    reference: "Chapter 2, Verse 48"
  },
  {
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
    transliteration: "Yada yada hi dharmasya glanir bhavati bharata",
    translation: "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharat, then I manifest Myself.",
    reference: "Chapter 4, Verse 7"
  },
  {
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।",
    transliteration: "Nainam chhindanti shastrani nainam dahati pavakah",
    translation: "The soul can never be cut to pieces by any weapon, nor burned by fire, nor moistened by water, nor withered by the wind.",
    reference: "Chapter 2, Verse 23"
  },
  {
    sanskrit: "श्रद्धावाँल्लभते ज्ञानं तत्पर: संयतेन्द्रिय:।",
    transliteration: "Shraddhavan labhate jnanam tat-parah samyatendriyah",
    translation: "A faithful man who is dedicated to transcendental knowledge and who subdues his senses is eligible to achieve such knowledge.",
    reference: "Chapter 4, Verse 39"
  }
];

export default function ShlokaBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shlokas.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white/40 backdrop-blur-sm border border-primary/10 rounded-3xl p-6 shadow-inner overflow-hidden relative">
      <div className="absolute top-4 right-4 text-primary/20">
        <BookOpen size={48} />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <p className="text-primary font-bold text-lg">{shlokas[current].sanskrit}</p>
          <p className="text-foreground/60 italic text-xs">{shlokas[current].transliteration}</p>
          <p className="text-foreground/80 font-medium leading-relaxed">{shlokas[current].translation}</p>
          <div className="flex items-center gap-2 pt-2">
             <div className="h-px w-8 bg-primary/30" />
             <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{shlokas[current].reference}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
