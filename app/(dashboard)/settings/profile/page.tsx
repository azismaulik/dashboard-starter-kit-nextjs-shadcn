"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/badges";
import { toast } from "sonner";

function FormField({
  label,
  htmlFor,
  children,
  description,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start gap-2 md:gap-4">
      <label htmlFor={htmlFor} className="pt-1.5 text-sm font-medium">
        {label}
      </label>
      <div className="space-y-1">
        {children}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Avatar</CardTitle>
          <CardDescription>
            This picture will be displayed on your profile and next to your team
            activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <UserAvatar name="Ethan Caldwell" size="lg" />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                id="upload-avatar-button"
                onClick={() => toast.info("File upload dialog would open here")}
              >
                Upload photo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info("Avatar removed")}
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and bio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Full name" htmlFor="profile-name">
            <Input id="profile-name" defaultValue="Ethan Caldwell" />
          </FormField>
          <FormField label="Email address" htmlFor="profile-email">
            <Input
              id="profile-email"
              type="email"
              defaultValue="ethan.caldwell@acmecorp.io"
            />
          </FormField>
          <FormField
            label="Bio"
            htmlFor="profile-bio"
            description="Brief description for your team profile."
          >
            <Textarea
              id="profile-bio"
              rows={3}
              defaultValue="Co-founder & CEO at Acme Corp. Building the future of work."
            />
          </FormField>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          id="save-profile-button"
          onClick={() => toast.success("Profile saved successfully.")}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
