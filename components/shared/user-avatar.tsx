import * as React from "react"
import { getInitials } from "@/lib/utils"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"

export interface UserAvatarProps {
  name: string
  src?: string
  size?: "sm" | "default" | "lg"
  className?: string
}

export function UserAvatar({
  name,
  src,
  size = "default",
  className,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

export interface UserAvatarGroupItem {
  name: string
  src?: string
}

export interface UserAvatarGroupProps {
  users: UserAvatarGroupItem[]
  max?: number
  size?: "sm" | "default" | "lg"
}

export function UserAvatarGroup({
  users,
  max = 3,
  size = "sm",
}: UserAvatarGroupProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <AvatarGroup>
      {visible.map((user, i) => (
        <UserAvatar
          key={i}
          name={user.name}
          src={user.src}
          size={size}
        />
      ))}
      {overflow > 0 && <AvatarGroupCount>+{overflow}</AvatarGroupCount>}
    </AvatarGroup>
  )
}
