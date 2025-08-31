import { useState } from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'
import GoogleLogo from '@/assets/google-logo.svg'
import WeChatLogo from '@/assets/wechat.png'

interface LoginButtonProps {
  children: React.ReactNode
  className?: string
}

export function LoginButton({ children, className }: LoginButtonProps) {
  const [open, setOpen] = useState(false)
  const { login, isLoading } = useAuthStore()
  
  const handleGoogleLogin = async () => {
    try {
      await login('google')
      setOpen(false)
    } catch (error) {
      console.error('Google login failed:', error)
    }
  }
  
  const handleWeChatLogin = async () => {
    try {
      await login('wechat')
      setOpen(false)
    } catch (error) {
      console.error('WeChat login failed:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log in to New Energy Coder Club</DialogTitle>
          <DialogDescription>
            Choose one of the following methods to log in
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img 
              src={GoogleLogo} 
              alt="Google" 
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full bg-[#07C160] hover:bg-[#06B056] text-white hover:text-white border-[#07C160] hover:border-[#06B056]"
            onClick={handleWeChatLogin}
            disabled={isLoading}
          >
            <img 
              src={WeChatLogo} 
              alt="WeChat" 
              className="w-5 h-5"
            />
            Continue with WeChat
          </Button>
        </div>
        <button 
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}

// LoginModal component removed - functionality consolidated into LoginButton