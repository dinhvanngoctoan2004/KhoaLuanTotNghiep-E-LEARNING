import { motion } from "framer-motion";

export default function Test() {
  return (
    <>
      return (
      <div className="flex flex-col items-center space-y-[50vh] py-20">
        {/* Hiệu ứng bay từ dưới lên */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }} // Chỉ chạy 1 lần khi cuộn tới
          className="text-5xl font-bold text-[#AFD0D9]"
        >
          Chữ hiện ra khi lướt tới
        </motion.h2>

        {/* Hiệu ứng hiện từng chữ một (Stagger) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1.5 }}
          viewport={{ once: false, amount: 0.5 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          className="text-3xl flex gap-2"
        >
          {["Học", "TOEIC", "Thật", "Dễ"].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                visible: { opacity: 1, scale: 1, y: 0 },
                hidden: { opacity: 0, scale: 0.5, y: 50 },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
      );
    </>
  );
}
