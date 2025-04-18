import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. The product must be unused and in original condition.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 5-7 business days, depending on your location.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! Our support team is available 24/7 via email, phone, or live chat.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely. You’ll receive a tracking number once your order has been shipped.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <p className="font-extrabold flex justify-center mb-10 text-4xl">Frequently Asked Questions</p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-lg bg-white hover:bg-gray-100 transition"
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
