export * from "./nav"

export type UserRole = "owner" | "admin" | "member" | "viewer"
export type UserStatus = "active" | "inactive" | "suspended" | "invited"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastActiveAt: string
}

export type ProjectStatus = "active" | "paused" | "completed" | "archived"

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  members: number
  owner: string
  createdAt: string
  updatedAt: string
  dueDate?: string
}

export type TransactionStatus = "completed" | "pending" | "failed" | "refunded"
export type PaymentMethod = "card" | "bank" | "paypal"

export interface Transaction {
  id: string
  description: string
  amount: number
  status: TransactionStatus
  date: string
  customer: string
  method: PaymentMethod
}

export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  description: string
  type: NotificationType
  read: boolean
  createdAt: string
  href?: string
}

export interface ActivityActor {
  name: string
  avatar?: string
}

export interface Activity {
  id: string
  actor: ActivityActor
  action: string
  resource: string
  resourceId: string
  timestamp: string
  metadata?: Record<string, string>
}
