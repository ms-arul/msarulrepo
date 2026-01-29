import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { fadeIn } from "../../variants";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    const form = event.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Submission failed");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully! I’ll get back to you soon 🚀",
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again ❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px] text-center xl:text-left">
          {/* Heading */}
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-12 text-center"
          >
            Let's <span className="text-accent">connect.</span>
          </motion.h2>

          {/* Form */}
          <motion.form
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-6"
          >
            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input"
                required
                disabled={isLoading}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="input"
                required
                disabled={isLoading}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="input"
              required
              disabled={isLoading}
            />

            <textarea
              name="message"
              placeholder="Your message..."
              className="textarea resize-none"
              required
              disabled={isLoading}
            />

            {/* Status message */}
            {status.message && (
              <p
                role="alert"
                aria-live="polite"
                className={`text-sm ${
                  status.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn relative rounded-full border border-white/50 max-w-[180px] px-8 self-center xl:self-start
                flex items-center justify-center gap-2 overflow-hidden transition-all duration-300
                hover:border-accent disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                {isLoading ? "Sending..." : "Let's talk"}
              </span>

              <BsArrowRight
                className="absolute text-[22px] opacity-0 -translate-y-[120%]
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
