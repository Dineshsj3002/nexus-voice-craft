import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
interface StatisticProps {
  value: number;
  label: string;
  suffix?: string;
}
const Statistic: React.FC<StatisticProps> = ({
  value,
  label,
  suffix = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(latest) {
          node.textContent = Math.floor(latest).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);
  return <div className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold text-nexus-primary">
        <span ref={ref}>0</span>
      </h3>
      <p className="text-sm md:text-base text-gray-600 mt-1">{label}</p>
    </div>;
};
const StatisticsCounter = () => {
  const stats = [{
    value: 10000,
    label: 'Alumni Network',
    suffix: '+'
  }, {
    value: 500,
    label: 'Mentorship Programs',
    suffix: '+'
  }, {
    value: 95,
    label: 'Success Rate',
    suffix: '%'
  }, {
    value: 200,
    label: 'Annual Events',
    suffix: '+'
  }];
  return <section className="py-16 bg-stone-50">
      <div className="container mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.5
      }} transition={{
        staggerChildren: 0.2
      }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => <motion.div key={index} variants={{
          hidden: {
            opacity: 0,
            y: 20
          },
          visible: {
            opacity: 1,
            y: 0
          }
        }}>
              <Statistic {...stat} />
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default StatisticsCounter;