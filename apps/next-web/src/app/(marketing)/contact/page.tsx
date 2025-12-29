"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import ScrollToTop from "../../components/landing/ScrollToTop";
import { useState } from "react";
import { supabase } from "@foclupus/api-client";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@foclupus.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Available 9am-6pm EST",
    description: "Get instant help from our team",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    description: "Remote-first company",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('contacts').insert([formData]);

      if (error) {
        console.error('Error submitting contact form:', error);
        alert('Failed to send message. Please try again.');
      } else {
        alert('Message sent successfully! 🐺');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 bg-gradient-to-b from-cream-light to-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <info.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {info.title}
                </h3>
                <p className="text-primary font-medium mb-1">
                  {info.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
