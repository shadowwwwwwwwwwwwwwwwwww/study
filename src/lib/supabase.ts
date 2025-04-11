
import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase-types'

// These values should be replaced with environment variables in a production app
// For now, they'll be placeholder values
const supabaseUrl = 'https://your-supabase-project.supabase.co'
const supabaseAnonKey = 'your-supabase-anon-key'

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const initializeDatabase = async () => {
  try {
    // This function would create the necessary tables in Supabase if they don't exist
    // In a real implementation with Supabase, we would use SQL migrations or
    // execute SQL through the Supabase client

    console.log('Database initialization would happen here')
    
    // Example SQL that would create these tables:
    /*
    CREATE TABLE github_repositories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      full_name TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      owner_avatar TEXT,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      last_synced TIMESTAMP
    );

    CREATE TABLE repository_files (
      id SERIAL PRIMARY KEY,
      repository_id INTEGER REFERENCES github_repositories(id),
      path TEXT NOT NULL,
      filename TEXT NOT NULL,
      content TEXT NOT NULL,
      sha TEXT NOT NULL,
      size INTEGER NOT NULL,
      last_modified TIMESTAMP NOT NULL,
      last_synced TIMESTAMP NOT NULL
    );
    */

    return true
  } catch (error) {
    console.error('Error initializing database:', error)
    return false
  }
}

// Example functions for working with repositories
export const saveRepository = async (repoData: any) => {
  const { data, error } = await supabase
    .from('github_repositories')
    .insert({
      name: repoData.name,
      full_name: repoData.full_name,
      description: repoData.description,
      url: repoData.html_url,
      owner_name: repoData.owner.login,
      owner_avatar: repoData.owner.avatar_url,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at,
      last_synced: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('Error saving repository:', error)
    return null
  }

  return data[0]
}

// Example function for saving a file
export const saveFile = async (repositoryId: number, fileData: any) => {
  const content = typeof fileData.content === 'string' 
    ? fileData.content 
    : Buffer.from(fileData.content, 'base64').toString()

  const { data, error } = await supabase
    .from('repository_files')
    .insert({
      repository_id: repositoryId,
      path: fileData.path,
      filename: fileData.name,
      content: content,
      sha: fileData.sha,
      size: fileData.size,
      last_modified: new Date(fileData.last_modified || new Date()).toISOString(),
      last_synced: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('Error saving file:', error)
    return null
  }

  return data[0]
}
