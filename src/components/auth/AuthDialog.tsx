
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { Google, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthDialogProps {
  triggerText: string;
  triggerClassName?: string;
  defaultTab?: 'login' | 'register';
}

const AuthDialog = ({ 
  triggerText, 
  triggerClassName, 
  defaultTab = 'login' 
}: AuthDialogProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const { toast } = useToast();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `${provider} login will be integrated soon!`,
    });
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'login' ? 'Welcome Back' : 'Join Our Community'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs 
          defaultValue={defaultTab} 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <TabsContent value="login" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('Google')}
                      className="w-full flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    >
                      <Google className="h-4 w-4" />
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('LinkedIn')}
                      className="w-full flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <LoginForm 
                    onSuccess={handleClose}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('Google')}
                      className="w-full flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    >
                      <Google className="h-4 w-4" />
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialLogin('LinkedIn')}
                      className="w-full flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <RegisterForm 
                    onSuccess={handleClose}
                  />
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
