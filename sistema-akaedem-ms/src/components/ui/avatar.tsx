"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { getInitials } from "@/lib/getInitials";
import { UserData } from "@/mocks/dashboard";

import { cn } from "@/lib/utils";

/* Radix Avatar primitives wrapped with shadcn-style Tailwind classes */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("object-cover h-full w-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* Componente pronto para uso com os mocks (exibe foto se houver, senão iniciais) */
export default function UserAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8";

  // UserData vindo do teu mock; adapta se o nome da exportação for diferente
  const name = UserData?.name ?? "";
  const avatarUrl = UserData?.avatar ?? undefined;

  return (
    <Avatar className={cn(sizeClass, className)}>
      {avatarUrl ? (
        <AvatarImage src={avatarUrl} alt={name} />
      ) : (
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      )}
    </Avatar>
  );
}

/* também exporto as primitives caso queiras usá-las diretamente */
export { Avatar, AvatarImage, AvatarFallback };
