
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ideaService } from "@/services/api";
import { Idea } from "@/types/idea";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const { data: ideas = [], isLoading, error } = useQuery({
    queryKey: ["ideas"],
    queryFn: ideaService.getIdeas,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: ideaService.voteIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast({
        title: "Success",
        description: "Vote recorded successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to vote",
        variant: "destructive",
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({ ideaId, text }: { ideaId: string; text: string }) =>
      ideaService.commentIdea(ideaId, text),
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600">Loading ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-red-600">Error loading ideas. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Innovation Dashboard</h1>
          <Button className="bg-primary hover:bg-primary-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Idea
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(ideas) && ideas.length > 0 ? (
            ideas.map((idea: Idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{idea.title || "Untitled"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{idea.description || "No description provided"}</p>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => voteMutation.mutate(idea.id)}
                          className="flex items-center space-x-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{idea.votes || 0}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{idea.comments?.length || 0}</span>
                        </Button>
                      </div>
                      <span className="text-sm text-gray-500">
                        by {idea.author?.name || "Anonymous"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-600">No ideas found. Be the first to share an idea!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
