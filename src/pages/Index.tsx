
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Database, Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Github size={32} className="text-teal-400" />
            <Database size={32} className="text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            GitHub to Supabase Sync
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Seamlessly sync your GitHub repository code to Supabase database for storage and analysis
          </p>
        </header>

        <Tabs 
          defaultValue="overview" 
          value={currentTab}
          onValueChange={setCurrentTab} 
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>GitHub to Supabase Synchronization</CardTitle>
                <CardDescription className="text-slate-300">
                  Store your code repositories in a structured database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  This application allows you to connect to GitHub repositories, fetch code, and store it in a 
                  Supabase database for easier searching, analysis, and management.
                </p>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <h3 className="text-lg font-semibold text-teal-400 mb-2">To get started:</h3>
                  <p className="mb-4">
                    This app requires Supabase integration to store repository data. You need to connect 
                    to Supabase before implementing this functionality.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <svg viewBox="0 0 24 24" width="16" height="16" className="text-blue-400 fill-current">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>
                    </svg>
                    <span>Click the green Supabase button in the top right to connect</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button 
                  onClick={() => setCurrentTab("setup")}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                >
                  View Setup Guide <ArrowRight size={16} className="ml-2" />
                </Button>
                
                <Link to="/dashboard">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                    Preview Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription className="text-slate-300">
                  What you can do with GitHub to Supabase sync
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3 mb-2">
                      <Github className="text-teal-400" />
                      <h3 className="font-semibold">GitHub Integration</h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Connect to repositories, fetch files and commit history, and monitor changes over time
                    </p>
                  </div>
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="text-blue-400" />
                      <h3 className="font-semibold">Supabase Storage</h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Store code files, metadata, and repository information in structured database tables
                    </p>
                  </div>
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3 mb-2">
                      <svg viewBox="0 0 24 24" width="24" height="24" className="text-teal-400" stroke="currentColor" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <h3 className="font-semibold">Code Analysis</h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Search across all your code, track changes, and analyze patterns in your repositories
                    </p>
                  </div>
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3 mb-2">
                      <svg viewBox="0 0 24 24" width="24" height="24" className="text-blue-400" stroke="currentColor" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <h3 className="font-semibold">Auto-Sync</h3>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Automatically update database when repositories change with webhook integration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="setup" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Setup Guide</CardTitle>
                <CardDescription className="text-slate-300">
                  How to connect GitHub repositories to Supabase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Step 1: Connect to Supabase</h3>
                    <p className="mb-4">
                      Before implementing GitHub to Supabase synchronization, you need to connect your 
                      Lovable project to Supabase.
                    </p>
                    <div className="flex items-start gap-3 mb-2 text-sm">
                      <div className="min-w-6 mt-1">→</div>
                      <div>
                        Click the green Supabase button in the top right of the Lovable interface
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mb-2 text-sm">
                      <div className="min-w-6 mt-1">→</div>
                      <div>
                        Follow the prompts to connect to your Supabase project or create a new one
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600 opacity-60">
                    <h3 className="text-lg font-semibold text-teal-400 mb-2">Step 2: Set Up Database Schema</h3>
                    <p className="mb-2 text-sm">
                      Once connected to Supabase, we'll create the necessary tables to store repository information
                      (This feature will be available after connecting to Supabase)
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/40 rounded-lg border border-slate-600 opacity-60">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Step 3: Configure GitHub Integration</h3>
                    <p className="mb-2 text-sm">
                      Set up GitHub API access to fetch repository data
                      (This feature will be available after connecting to Supabase)
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-4">
                <div className="p-4 w-full bg-blue-900/30 border border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> This functionality requires connecting to Supabase first. After 
                    connecting, we can implement the data storage features.
                  </p>
                </div>
                <a href="https://docs.lovable.dev/integrations/supabase/" className="text-blue-400 hover:underline flex items-center" target="_blank" rel="noreferrer">
                  Learn more about Supabase integration
                  <ArrowRight size={14} className="ml-1" />
                </a>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <footer className="mt-16 text-center text-sm text-slate-400">
          <p>
            GitHub to Supabase Sync - Store your code in a structured database
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
