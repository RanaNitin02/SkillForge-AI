import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import contactImg from "@/assets/img/logo/contact.webp";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Message Sent ✅", {
      description: "We’ll get back to you soon 🚀",
    });

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        
        <div className="relative hidden md:flex">
          <img
            src={contactImg}
            alt="Contact"
            className="object-cover w-full h-full transform hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/80 to-blue-700/80 flex flex-col items-center justify-center text-center p-10 text-white">
            <h2 className="text-4xl font-extrabold mb-4">Let’s Connect</h2>
            <p className="text-lg opacity-90 max-w-sm">
              Have questions, feedback, or collaboration ideas?  
              We’d love to hear from you!
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 hover:opacity-90 transition-transform transform hover:-translate-y-1"
            >
              🚀 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
