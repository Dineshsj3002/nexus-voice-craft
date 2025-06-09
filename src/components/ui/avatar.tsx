
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
  }
>(({ className, onLoadingStatusChange, ...props }, ref) => {
  const [loadingStatus, setLoadingStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  React.useEffect(() => {
    onLoadingStatusChange?.(loadingStatus);
  }, [loadingStatus, onLoadingStatusChange]);

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn(
        "aspect-square h-full w-full transition-all duration-300",
        loadingStatus === 'loaded' && "animate-avatar-load",
        loadingStatus === 'loading' && "opacity-0",
        className
      )}
      onLoadingStatusChange={(status) => {
        setLoadingStatus(status);
      }}
      {...props}
    />
  );
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    isLoading?: boolean;
  }
>(({ className, isLoading, children, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted transition-all duration-300",
      isLoading && "animate-pulse",
      !isLoading && "animate-avatar-load",
      className
    )}
    {...props}
  >
    {isLoading ? (
      <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
    ) : (
      children
    )}
  </AvatarPrimitive.Fallback>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
