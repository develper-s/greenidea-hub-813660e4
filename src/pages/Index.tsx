
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            GreenFuture
            <span className="block text-primary">Innovation Management System</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Empowering sustainable innovation through collaboration. Share ideas, make an impact, and
            shape the future of environmental consulting.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary-hover">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3 animate-fadeIn">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Share Ideas</h3>
            <p className="text-gray-600">Submit your innovative ideas for sustainable solutions.</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Collaborate</h3>
            <p className="text-gray-600">Work together to refine and improve proposals.</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2">Make Impact</h3>
            <p className="text-gray-600">See your ideas transform into real-world solutions.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
