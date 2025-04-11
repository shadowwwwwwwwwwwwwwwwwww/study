
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, AlertCircle, CheckCircle } from "lucide-react";

interface DatabaseStatusProps {
  isConnected: boolean;
  tablesCreated: boolean;
  repoCount?: number;
  fileCount?: number;
}

export default function DatabaseStatus({
  isConnected = false,
  tablesCreated = false,
  repoCount = 0,
  fileCount = 0
}: DatabaseStatusProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Database size={18} className="text-blue-400" />
          Supabase Database Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 border-b border-slate-700">
            <span className="text-sm text-slate-300">Connection Status</span>
            <div className="flex items-center gap-1.5">
              {isConnected ? (
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
              {tablesCreated ? (
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
          
          {!isConnected && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-800 rounded-md text-xs text-blue-200">
              To connect to Supabase, click the green Supabase button in the top right 
              of the Lovable interface and follow the connection process.
            </div>
          )}
          
          {isConnected && !tablesCreated && (
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
