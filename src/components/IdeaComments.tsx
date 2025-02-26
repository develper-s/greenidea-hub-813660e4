
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/idea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ideaService } from "@/services/api";
import { MessageSquare } from "lucide-react";

interface IdeaCommentsProps {
  ideaId: string;
  comments: Comment[];
}

export function IdeaComments({ ideaId, comments }: IdeaCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: () => ideaService.commentIdea(ideaId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      commentMutation.mutate();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <MessageSquare className="h-4 w-4" />
        <span>Comments ({comments.length})</span>
      </div>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-800">{comment.text}</p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span>{comment.author?.name || "Anonymous"}</span>
              <span>•</span>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <Button
          type="submit"
          disabled={commentMutation.isPending || !newComment.trim()}
          className="bg-primary hover:bg-primary-hover"
        >
          {commentMutation.isPending ? "Adding..." : "Add Comment"}
        </Button>
      </form>
    </div>
  );
}
