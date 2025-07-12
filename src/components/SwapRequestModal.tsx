import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { User, Skill } from "@/types"
import { currentUser } from "@/lib/mockData"
import { ArrowRight, Send } from "lucide-react"

interface SwapRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  targetUser: User | null
}

export function SwapRequestModal({ open, onOpenChange, targetUser }: SwapRequestModalProps) {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState<string>("")
  const [selectedWantedSkill, setSelectedWantedSkill] = useState<string>("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedOfferedSkill || !selectedWantedSkill || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to send your swap request.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Swap request sent!",
        description: `Your request has been sent to ${targetUser?.name}. They will be notified.`,
      })
      
      // Reset form
      setSelectedOfferedSkill("")
      setSelectedWantedSkill("")
      setMessage("")
      onOpenChange(false)
    }, 1000)
  }

  const selectedOfferedSkillObj = currentUser.skillsOffered.find(s => s.id === selectedOfferedSkill)
  const selectedWantedSkillObj = targetUser?.skillsOffered.find(s => s.id === selectedWantedSkill)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Skill Swap</DialogTitle>
          <DialogDescription>
            Send a skill swap request to {targetUser?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Exchange Preview */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-medium mb-4">Skill Exchange</h3>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex-1 text-center">
                  <div className="text-sm text-muted-foreground">You offer</div>
                  {selectedOfferedSkillObj ? (
                    <Badge className="mt-1" style={{ backgroundColor: 'hsl(var(--skill-offered))' }}>
                      {selectedOfferedSkillObj.name}
                    </Badge>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">Select skill</div>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1 text-center">
                  <div className="text-sm text-muted-foreground">You want</div>
                  {selectedWantedSkillObj ? (
                    <Badge className="mt-1" style={{ backgroundColor: 'hsl(var(--skill-wanted))' }}>
                      {selectedWantedSkillObj.name}
                    </Badge>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">Select skill</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Skill I Offer</Label>
              <Select value={selectedOfferedSkill} onValueChange={setSelectedOfferedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose skill" />
                </SelectTrigger>
                <SelectContent>
                  {currentUser.skillsOffered.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name} ({skill.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Skill I Want</Label>
              <Select value={selectedWantedSkill} onValueChange={setSelectedWantedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose skill" />
                </SelectTrigger>
                <SelectContent>
                  {targetUser?.skillsOffered.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name} ({skill.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Personal Message</Label>
            <Textarea
              id="message"
              placeholder="Tell them why you'd like to learn this skill and what you can offer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !selectedOfferedSkill || !selectedWantedSkill || !message.trim()}
              className="flex-1"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}