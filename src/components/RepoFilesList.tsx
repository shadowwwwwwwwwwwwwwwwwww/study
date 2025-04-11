
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderIcon, RefreshCw } from "lucide-react";
import { FileIcon } from "@/components/ui/file-icon";
import type { GithubRepo, GithubFile } from "@/types/github";

interface RepoFilesListProps {
  repo: GithubRepo;
  onFileSelect: (file: GithubFile) => void;
}

export default function RepoFilesList({ repo, onFileSelect }: RepoFilesListProps) {
  const [path, setPath] = useState("");
  const [files, setFiles] = useState<Array<{ name: string; type: "file" | "dir" }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a mock implementation
      // In a real app with Supabase, we would store the GitHub token and use it for authenticated requests
      const apiPath = path 
        ? `https://api.github.com/repos/${repo.full_name}/contents/${path}`
        : `https://api.github.com/repos/${repo.full_name}/contents`;
        
      const response = await fetch(apiPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.statusText}`);
      }
      
      const filesData = await response.json();
      
      // Sort directories first, then files
      const sortedFiles = Array.isArray(filesData) 
        ? [...filesData].sort((a, b) => {
            if (a.type !== b.type) {
              return a.type === "dir" ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
          })
        : [];
      
      setFiles(sortedFiles.map(file => ({ 
        name: file.name, 
        type: file.type === "dir" ? "dir" : "file" 
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repository files");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileClick = async (fileName: string, type: "file" | "dir") => {
    if (type === "dir") {
      const newPath = path ? `${path}/${fileName}` : fileName;
      setPath(newPath);
      await fetchFiles();
    } else {
      // Fetch file content and pass to onFileSelect
      try {
        const filePath = path ? `${path}/${fileName}` : fileName;
        const response = await fetch(`https://api.github.com/repos/${repo.full_name}/contents/${filePath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        
        const fileData = await response.json();
        onFileSelect(fileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch file content");
      }
    }
  };
  
  const navigateUp = () => {
    if (!path) return;
    
    const pathParts = path.split("/");
    pathParts.pop();
    const newPath = pathParts.join("/");
    setPath(newPath);
    fetchFiles();
  };
  
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <FolderIcon size={18} className="text-blue-400" />
            <span className="truncate">
              {repo.full_name}:{path || "/"}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchFiles}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw size={16} className={`${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="px-4 py-2 border-b border-slate-700 flex">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={navigateUp}
            disabled={!path || isLoading} 
            className="text-sm"
          >
            ← Up
          </Button>
          <div className="grow"></div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {}} // Will be implemented with Supabase
            className="bg-teal-600/20 text-teal-300 border-teal-700 hover:bg-teal-600/30"
            disabled={true}
          >
            Sync All Files
          </Button>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-300">
            Error: {error}
          </div>
        )}
        
        {!files.length && !error && !isLoading ? (
          <div className="p-4 text-center text-slate-400 flex-1 flex items-center justify-center flex-col">
            <p>Click refresh to load repository files</p>
            <Button
              variant="outline"
              size="sm" 
              onClick={fetchFiles}
              className="mt-2"
            >
              Load Files
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="p-1">
              {files.map((file) => (
                <button
                  key={file.name}
                  onClick={() => handleFileClick(file.name, file.type)}
                  className="w-full text-left p-2 hover:bg-slate-700 rounded-md flex items-center gap-2 text-sm"
                >
                  {file.type === "dir" ? (
                    <FolderIcon size={16} className="text-blue-400" />
                  ) : (
                    <FileIcon size={16} className="text-slate-400" />
                  )}
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="animate-spin text-blue-400" />
              <span>Loading files...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
