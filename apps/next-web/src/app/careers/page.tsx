"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import ScrollToTop from "../components/landing/ScrollToTop";

const perks = [
  { icon: MapPin, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Heart, title: "Health Benefits", description: "Comprehensive health & dental coverage" },
  { icon: Clock, title: "Flexible Hours", description: "We trust you to manage your time" },
  { icon: Zap, title: "Learning Budget", description: "$1,000/year for courses & conferences" },
  { icon: Users, title: "Team Retreats", description: "Annual in-person gatherings" },
];

const openings = [
  {
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Success Lead",
    department: "Support",
    location: "Remote",
    type: "Full-time",
  },
];

const Careers = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cream-light to-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              🐺 Join the Pack
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Build the Future of <span className="text-gradient">Focus</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're a small, passionate team on a mission to help millions reclaim their attention. 
              If you're excited about making a real impact, we'd love to meet you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-cream">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            Why Work With Us
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-12 h-12 gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <perk.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-cream-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground">Find your role in the pack</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="bg-card rounded-2xl p-6 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
              >
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {job.type}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Apply <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Don't see your role? We're always looking for talented people.
            </p>
            <Button variant="outline">Send Open Application</Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Careers;
