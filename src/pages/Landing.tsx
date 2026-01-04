import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, BarChart3, Trophy, Code2, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '-4s' }} />
        
        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Inspired by TLE CP-31 Sheet</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Master <span className="gradient-text">Competitive</span><br />Programming
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                A structured 31-day practice sheet with curated problems, progress tracking, and performance analytics to accelerate your CP journey.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl glow-primary">
                  <Link to="/sheet">Start Practice <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 bg-card/50 font-semibold px-8 py-6 text-lg rounded-xl">
                  <Link to="/dashboard">View Progress <BarChart3 className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[{ value: '31', label: 'Days of Practice' }, { value: '93+', label: 'Curated Problems' }, { value: '4+', label: 'Platforms' }, { value: '∞', label: 'Growth Potential' }].map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Everything you need to <span className="gradient-text">level up</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Built for competitive programmers who want to practice efficiently.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Structured Roadmap', desc: '31-day curated problem set covering all essential CP topics.' },
              { icon: Zap, title: 'Daily Practice Goals', desc: 'Build consistency with daily problem targets and streak tracking.' },
              { icon: BarChart3, title: 'Performance Analytics', desc: 'Track your progress with beautiful charts and stats.' },
              { icon: Trophy, title: 'Contest Tracking', desc: 'Never miss a contest across all major CP platforms.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 lg:p-8">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 glow-sm">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Start your CP journey today</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to become a <span className="gradient-text">better coder</span>?</h2>
            <Button asChild size="lg" className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl glow-primary">
              <Link to="/sheet"><CheckCircle2 className="mr-2 w-5 h-5" />Get Started Free</Link>
            </Button>
            <div className="flex items-center justify-center gap-6 mt-12 text-muted-foreground">
              {['100% Free', 'No Sign-up Required', 'Open Source'].map((t) => (
                <div key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-status-solved" /><span className="text-sm">{t}</span></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
