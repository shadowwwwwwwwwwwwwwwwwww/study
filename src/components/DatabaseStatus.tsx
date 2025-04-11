
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { supabase, checkSupabaseConnection } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface DatabaseStatusProps {
  onConnectionChange?: (status: boolean) => void;
}

export default function DatabaseStatus({ onConnectionChange }: DatabaseStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [tablesCreated, setTablesCreated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [repoCount, setRepoCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  // Check Supabase connection status on component mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
      
      if (connected) {
        // Check if tables exist
        await checkTables();
        // Load counts
        await loadCounts();
      }
      
      if (onConnectionChange) {
        onConnectionChange(connected);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  const checkTables = async () => {
    try {
      // This is a simplified check - in a real app, you'd check for the existence of specific tables
      const { data: repoTable } = await supabase
        .from('github_repositories')
        .select('id')
        .limit(1);
        
      const { data: fileTable } = await supabase
        .from('repository_files')
        .select('id')
        .limit(1);

      setTablesCreated(repoTable !== null && fileTable !== null);
    } catch (error) {
      console.error("Error checking tables:", error);
      setTablesCreated(false);
    }
  };

  const loadCounts = async () => {
    try {
      // Get repository count
      const { count: repoCount } = await supabase
        .from('github_repositories')
        .select('id', { count: 'exact', head: true });

      // Get files count
      const { count: fileCount } = await supabase
        .from('repository_files')
        .select('id', { count: 'exact', head: true });

      setRepoCount(repoCount || 0);
      setFileCount(fileCount || 0);
    } catch (error) {
      console.error("Error loading counts:", error);
    }
  };
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-blue-400" />
            Supabase Database Status
          </div>
          {!isChecking && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={checkConnection} 
              className="h-7 w-7 p-0 rounded-full"
            >
              <Loader2 className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 border-b border-slate-700">
            <span className="text-sm text-slate-300">Connection Status</span>
            <div className="flex items-center gap-1.5">
              {isChecking ? (
                <Loader2 size={16} className="animate-spin text-blue-400" />
              ) : isConnected ? (
                <>
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-green-400 text-sm">Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-amber-400" />
                  <span className="text-amber-400 text-sm">Not Connected</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 border-b border-slate-700">
            <span className="text-sm text-slate-300">Schema Status</span>
            <div className="flex items-center gap-1.5">
              {isChecking ? (
                <Loader2 size={16} className="animate-spin text-blue-400" />
              ) : tablesCreated ? (
                <>
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-green-400 text-sm">Tables Created</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-amber-400" />
                  <span className="text-amber-400 text-sm">Tables Not Created</span>
                </>
              )}
            </div>
          </div>
          
          {isConnected && tablesCreated && (
            <>
              <div className="flex items-center justify-between p-2 border-b border-slate-700">
                <span className="text-sm text-slate-300">Repositories</span>
                <span className="text-blue-300 font-mono">{repoCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-2">
                <span className="text-sm text-slate-300">Code Files</span>
                <span className="text-blue-300 font-mono">{fileCount}</span>
              </div>
            </>
          )}
          
          {!isConnected && !isChecking && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md text-xs text-blue-200">
              To connect to Supabase, click the green Supabase button in the top right 
              of the Lovable interface and follow the connection process.
            </div>
          )}
          
          {isConnected && !tablesCreated && !isChecking && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md text-xs text-blue-200">
              Database connected, but schema needs to be set up. Click "Set Up Database Schema"
              to create the necessary tables.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
