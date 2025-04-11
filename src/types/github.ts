
export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  language: string | null;
}

export interface GithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  content: string;
  encoding: string;
}

export interface GithubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
}
