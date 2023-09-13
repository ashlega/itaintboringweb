import {motion} from "framer-motion";

export default function ScrollAnimationWrapperSimple({children, className, ...props}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}