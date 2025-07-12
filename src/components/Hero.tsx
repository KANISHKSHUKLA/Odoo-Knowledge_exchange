import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Star } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="sketch-border bg-card p-3 rotate-12">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="sketch-border bg-card p-3 -rotate-12">
          <Users className="h-6 w-6 text-skill-offered" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="sketch-border bg-card p-3 rotate-6">
          <Star className="h-6 w-6 text-skill-wanted" />
        </div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Learn Together,{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with amazing people to exchange skills and knowledge. 
            Trade your expertise for something new you want to learn.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/register">
              Start Swapping Skills
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/browse">
              Browse Skills
            </Link>
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-skill-offered mb-2">1,200+</div>
            <div className="text-muted-foreground">Skills Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-skill-wanted mb-2">95%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}