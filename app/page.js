import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart,
  Calendar,
  ChevronRight,
  Divide,
  Layout,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto py-20 text-center landing_page_height flex justify-center items-center flex-col">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline Your Workflow <br />
          <span>
            {" "}
            with <span className="tracking-normal">Planify</span>
          </span>
        </h1>
        <p className="sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Empower your team with our intuitive project management solution.
        </p>
        <p className="text-xl  max-w-2xl mx-auto"></p>
        <div className="flex gap-3 flex-col sm:flex-row justify-center items-center">
          <Link href="/onboarding">
            <Button size="lg" className="mr-4">
              Get Started <ChevronRight size={18} className="ml-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="mr-[20px]">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="bg-gray-900 py-20 px-5 lg:h-screen flex justify-center items-center"
      >
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                  <h4 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* cta section */}

      {/* CTA Section */}
      <section className="py-20 text-center px-5  flex justify-center items-center">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl mb-12">
            Join thousands of teams already using ZCRUM to streamline their
            projects and boost productivity.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="animate-bounce">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
