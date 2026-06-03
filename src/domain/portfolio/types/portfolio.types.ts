export interface ProjectFrontmatter {
index: number;
title: string;
organization: string;
due: string;
description: string;
skills: string[];
images: string[];
}

export interface PortfolioState {
  frontmatter: ProjectFrontmatter | null;
  sections: string[];
  isLoading: boolean;
}