import { motion } from "motion/react";

interface TabProps {
  children: React.ReactNode;
  onClick?: () => void;
  animationProps?: object;
}

const Tabs = ({ onClick, animationProps, children }: TabProps) => {
  return (
    <motion.button
      className="text-2xl bg-black text-white border rounded-full py-0.5 px-3"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      {...animationProps}>
      {children}
    </motion.button>
  );
};

export default Tabs;
