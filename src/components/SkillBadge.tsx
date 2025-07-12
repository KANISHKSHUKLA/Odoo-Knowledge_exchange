import { cn } from "@/lib/utils"
import { Skill } from "@/types"

interface SkillBadgeProps {
  skill: Skill | string
  type: "offered" | "wanted"
  className?: string
  showLevel?: boolean
}

export function SkillBadge({ skill, type, className, showLevel }: SkillBadgeProps) {
  const skillName = typeof skill === 'string' ? skill : skill.name;
  const skillLevel = typeof skill === 'string' ? null : skill.level;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-smooth",
        type === "offered" 
          ? "skill-offered hover:scale-105" 
          : "skill-wanted hover:scale-105",
        className
      )}
    >
      <span>{skillName}</span>
      {showLevel && skillLevel && (
        <span className="text-xs opacity-75">
          {skillLevel}
        </span>
      )}
    </span>
  )
}