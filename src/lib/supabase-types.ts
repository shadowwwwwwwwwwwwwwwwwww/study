
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  url: string
  owner_name: string
  owner_avatar: string
  created_at: string
  updated_at: string
  last_synced: string | null
}

export interface RepositoryFile {
  id: number
  repository_id: number
  path: string
  filename: string
  content: string
  sha: string
  size: number
  last_modified: string
  last_synced: string
}

export interface Database {
  public: {
    Tables: {
      repository_files: {
        Row: RepositoryFile
        Insert: Omit<RepositoryFile, "id">
        Update: Partial<Omit<RepositoryFile, "id">>
      }
      github_repositories: {
        Row: GitHubRepository
        Insert: Omit<GitHubRepository, "id">
        Update: Partial<Omit<GitHubRepository, "id">>
      }
    }
  }
}
