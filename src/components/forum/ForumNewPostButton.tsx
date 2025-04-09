
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showSuccessToast } from '@/components/SuccessToast';

const ForumNewPostButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      
      // Reset form
      setPostTitle('');
      setPostContent('');
      setCategory('');
      setTags('');
      
      // Show success toast
      showSuccessToast({
        message: "Your discussion has been posted successfully!",
        emoji: "🚀"
      });
    }, 1000);
  };

  return (
    <>
      <Button 
        className="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Discussion
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Start a New Discussion</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="post-title">Discussion Title</Label>
              <Input 
                id="post-title" 
                placeholder="Enter a descriptive title" 
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="post-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Discussion</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="career">Career Advice</SelectItem>
                  <SelectItem value="industry">Industry Insights</SelectItem>
                  <SelectItem value="academic">Academic Resources</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="global">Global Opportunities</SelectItem>
                  <SelectItem value="innovation">Innovation & Entrepreneurship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="post-content">Discussion Content</Label>
              <Textarea 
                id="post-content" 
                placeholder="Share your thoughts, questions, or insights..." 
                className="min-h-[150px]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="post-tags">Tags (comma separated)</Label>
              <Input 
                id="post-tags" 
                placeholder="e.g. career, networking, advice" 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-nexus-primary hover:bg-nexus-primary/90 text-white"
              disabled={isSubmitting || !postTitle || !postContent || !category}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Discussion'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForumNewPostButton;
