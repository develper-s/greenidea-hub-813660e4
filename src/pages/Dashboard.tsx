
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
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
          {/* Placeholder cards for ideas */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Innovation Idea {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This is a placeholder for an innovative idea that will help shape the future of
                  environmental sustainability.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Submitted 2 days ago</span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
