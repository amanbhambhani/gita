'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shlokas = [
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    hinglish: "Karmanye vadhikaraste ma phaleshu kadachana.",
    meaning: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
  },
  {
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
    hinglish: "Yada yada hi dharmasya glanirbhavati bharata.",
    meaning: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Bharata, then I manifest myself."
  },
  {
    sanskrit: "योगस्थ: कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    hinglish: "Yogasthah kuru karmani sangam tyaktva dhananjaya.",
    meaning: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure."
  },
  {
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावक:।",
    hinglish: "Nainam chhindanti shastrani nainam dahati pavakah.",
    meaning: "The soul can never be cut to pieces by any weapon, nor burned by fire."
  },
  {
    sanskrit: "क्रोधाद्भवति सम्मोह: सम्मोहात्स्मृतिविभ्रम:।",
    hinglish: "Krodhad bhavati sammohah sammohat smriti-vibhramah.",
    meaning: "From anger comes delusion; from delusion, loss of memory; from loss of memory, the destruction of discrimination."
  }
];

export default function ShlokaBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % shlokas.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-12 px-6 bg-primary/5 border-y border-primary/10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <p className="font-display text-2xl md:text-3xl font-bold text-primary italic">
              &quot;{shlokas[index].sanskrit}&quot;
            </p>
            <p className="text-sm md:text-base text-muted-foreground font-medium tracking-wide uppercase">
              {shlokas[index].hinglish}
            </p>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {shlokas[index].meaning}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
