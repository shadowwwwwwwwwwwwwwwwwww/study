
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { GithubRepo } from "@/types/github";
import { saveRepository } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface RepoConnectorProps {
  onRepoSelect: (repo: GithubRepo) => void;
  isSupabaseConnected?: boolean;
}

export default function RepoConnector({ onRepoSelect, isSupabaseConnected = false }: RepoConnectorProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Format: username/repo or full GitHub URL
  const parseRepoUrl = (url: string) => {
    try {
      // If it's a full URL
      if (url.includes("github.com")) {
        const parsed = new URL(url);
        const pathParts = parsed.pathname.split("/").filter(Boolean);
        if (pathParts.length >= 2) {
          return `${pathParts[0]}/${pathParts[1]}`;
        }
      }
      
      // If it's just username/repo format
      if (url.split("/").length === 2) {
        return url;
      }
      
      throw new Error("Invalid repository format");
    } catch (err) {
      throw new Error("Please enter a valid GitHub repository URL or username/repo format");
    }
  };
  
  const fetchRepoInfo = async () => {
    setIsLoading(true);
    setError(null);
    setSavedToDb(false);
    
    try {
      const repoPath = parseRepoUrl(repoUrl);
      
      // Fetch repository information from GitHub API
      const response = await fetch(`https://api.github.com/repos/${repoPath}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.statusText}`);
      }
      
      const repoData = await response.json();
      onRepoSelect(repoData);
      
      // If Supabase is connected, save the repository to the database
      if (isSupabaseConnected) {
        await saveToSupabase(repoData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to repository");
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveToSupabase = async (repoData: GithubRepo) => {
    if (!isSupabaseConnected) return;
    
    setIsSaving(true);
    try {
      const savedRepo = await saveRepository(repoData);
      
      if (savedRepo) {
        setSavedToDb(true);
        toast({
          title: "Repository saved",
          description: `Successfully saved ${repoData.full_name} to Supabase database`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to save",
          description: "Could not save repository to database",
        });
      }
    } catch (err) {
      console.error("Error saving to Supabase:", err);
      toast({
        variant: "destructive",
        title: "Database error",
        description: err instanceof Error ? err.message : "Failed to save repository data",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github size={20} className="text-teal-400" />
          Connect GitHub Repository
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="repo-url" className="block text-sm font-medium text-slate-300 mb-1">
              Repository URL or username/repo
            </label>
            <div className="flex space-x-2">
              <Input
                id="repo-url"
                placeholder="e.g., github.com/username/repo or username/repo"
                className="bg-slate-700 border-slate-600 text-white"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <Button 
                onClick={fetchRepoInfo} 
                disabled={isLoading || !repoUrl.trim()} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enter the repository URL or username/repo format to connect
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {savedToDb && (
            <Alert className="bg-green-900/30 border-green-800 text-green-200">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Repository successfully saved to Supabase database</AlertDescription>
            </Alert>
          )}
          
          <div className="p-3 bg-slate-700/40 rounded-md text-xs text-slate-300">
            <p>
              <strong className="text-teal-400">Note:</strong> {isSupabaseConnected 
                ? "Connected to Supabase. Repository data will be saved to the database."
                : "You need to connect to Supabase first to store GitHub API tokens and repository data. Once connected, you'll be able to authenticate and sync repositories."}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-slate-400">
        You'll need GitHub permissions to access private repositories
      </CardFooter>
    </Card>
  );
}
