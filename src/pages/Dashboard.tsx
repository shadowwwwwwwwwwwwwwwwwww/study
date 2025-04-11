
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Database, Github, Code } from "lucide-react";
import { FileIcon } from "@/components/ui/file-icon";
import RepoConnector from "@/components/RepoConnector";
import RepoFilesList from "@/components/RepoFilesList";
import DatabaseStatus from "@/components/DatabaseStatus";
import type { GithubRepo, GithubFile } from "@/types/github";

export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [selectedFile, setSelectedFile] = useState<GithubFile | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  const handleRepoSelect = (repo: GithubRepo) => {
    setSelectedRepo(repo);
    setSelectedFile(null);
  };

  const handleFileSelect = (file: GithubFile) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Github size={24} className="text-teal-400" />
            <Database size={24} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">GitHub to Supabase Sync</h1>
          <p className="text-slate-300">
            Sync repositories and code to your Supabase database
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="repositories">
              <TabsList className="bg-slate-800/50 border border-slate-700 mb-4">
                <TabsTrigger value="repositories" className="data-[state=active]:bg-slate-700">
                  Repositories
                </TabsTrigger>
                <TabsTrigger value="files" className="data-[state=active]:bg-slate-700">
                  Files
                </TabsTrigger>
                <TabsTrigger value="sync" className="data-[state=active]:bg-slate-700">
                  Sync Status
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="repositories">
                <RepoConnector onRepoSelect={handleRepoSelect} />
                
                {selectedRepo && (
                  <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-md">
                    <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
                      <Github size={18} className="text-teal-400" />
                      Selected Repository
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-slate-400 block">Name</span>
                          <span className="text-white">{selectedRepo.full_name}</span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-slate-400 block">Description</span>
                          <span className="text-white">{selectedRepo.description || "No description"}</span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-slate-400 block">Primary Language</span>
                          <span className="text-white">{selectedRepo.language || "Not specified"}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-slate-400 block">Default Branch</span>
                          <span className="text-white">{selectedRepo.default_branch}</span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-slate-400 block">Last Updated</span>
                          <span className="text-white">
                            {new Date(selectedRepo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-slate-400 block">Size</span>
                          <span className="text-white">
                            {selectedRepo.size > 1000 
                              ? `${(selectedRepo.size / 1000).toFixed(1)} MB` 
                              : `${selectedRepo.size} KB`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <a 
                        href={selectedRepo.html_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-teal-400 text-sm flex items-center gap-1 hover:underline"
                      >
                        View on GitHub <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="files">
                {selectedRepo ? (
                  <RepoFilesList repo={selectedRepo} onFileSelect={handleFileSelect} />
                ) : (
                  <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-md text-center">
                    <p className="text-slate-400 mb-3">Please select a repository first</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const element = document.querySelector('[value="repositories"]') as HTMLElement;
                        if (element) element.click();
                      }}
                    >
                      Go to Repositories Tab
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="sync">
                <div className="bg-slate-800/50 border border-slate-700 rounded-md p-6">
                  <div className="text-center mb-6">
                    <Code size={40} className="mx-auto mb-3 text-blue-400" />
                    <h2 className="text-2xl font-semibold mb-1">Repository Sync</h2>
                    <p className="text-slate-400">
                      Sync your repositories to Supabase database
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/40 border border-slate-600 rounded-md flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Set Up Database Schema</h3>
                        <p className="text-sm text-slate-400">
                          Create the necessary tables in Supabase
                        </p>
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={true}
                      >
                        Set Up Schema
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-700/40 border border-slate-600 rounded-md flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Configure GitHub Token</h3>
                        <p className="text-sm text-slate-400">
                          Add your GitHub personal access token
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-slate-500"
                        disabled={true}
                      >
                        Configure
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-700/40 border border-slate-600 rounded-md flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Set Up Webhook</h3>
                        <p className="text-sm text-slate-400">
                          Automatically sync when code is updated
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-slate-500"
                        disabled={true}
                      >
                        Set Up
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-900/30 border border-blue-800 rounded-md">
                    <p className="text-sm text-blue-200">
                      <strong>Note:</strong> These features will be enabled after connecting to Supabase.
                      Please connect to Supabase first.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <DatabaseStatus onConnectionChange={(connected) => {
              // You could update other UI elements based on connection status
              console.log("Supabase connection status:", connected);
            }} />
            
            {selectedFile && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-md overflow-hidden">
                <div className="border-b border-slate-700 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileIcon size={16} className="text-slate-400 shrink-0" />
                    <span className="truncate text-sm">{selectedFile.path}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-7 bg-teal-900/30 hover:bg-teal-900/50 text-teal-300"
                    disabled={true}
                  >
                    Save to DB
                  </Button>
                </div>
                <div className="p-1">
                  <pre className="bg-slate-900 p-3 rounded text-xs text-slate-300 overflow-x-auto max-h-[400px]">
                    <code>
                      {selectedFile.content ? 
                        atob(selectedFile.content) : 
                        "Content not available or binary file"}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
