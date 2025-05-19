
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface TaskCommentsProps {
  initialComments: Comment[];
  currentUser: {
    name: string;
    avatar: string;
  };
}

const TaskComments = ({ initialComments, currentUser }: TaskCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      content: newComment,
      timestamp: 'Just now'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    toast({
      title: "Comment added",
      description: "Your comment has been added to the task.",
    });
  };
  
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
          <Avatar>
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-medium">{comment.user.name}</p>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
      
      <div className="pt-4">
        <Label htmlFor="new-comment">Add Comment</Label>
        <div className="flex gap-2 mt-1">
          <Textarea
            id="new-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            className="flex-1"
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskComments;
