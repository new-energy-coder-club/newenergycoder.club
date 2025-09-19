import { DocumentContent, DocumentMeta, DocumentFrontMatter, TableOfContentsItem, DocumentLoadResult } from '../types/document';

/**
 * 文档加载服务
 * 负责加载文档内容、解析元数据和生成目录
 */
export class DocumentLoader {
  private static instance: DocumentLoader;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = '';
  }

  public static getInstance(): DocumentLoader {
    if (!DocumentLoader.instance) {
      DocumentLoader.instance = new DocumentLoader();
    }
    return DocumentLoader.instance;
  }

  /**
   * 加载文档元数据
   */
  async loadMeta(category: string, subcategory?: string): Promise<DocumentMeta> {
    try {
      const metaPath = subcategory 
        ? `${this.baseUrl}/${category}/${subcategory}/_meta.json`
        : `${this.baseUrl}/${category}/_meta.json`;
      
      const response = await fetch(metaPath);
      if (!response.ok) {
        throw new Error(`Failed to load meta: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error loading document meta:', error);
      throw error;
    }
  }

  /**
   * 加载文档内容
   */
  async loadDocument(category: string, slug: string, subcategory?: string): Promise<DocumentLoadResult> {
    try {
      // 首先尝试加载目录下的index.md文件（这是主要的文档结构）
      const indexPath = subcategory
        ? `/docs/${category}/${subcategory}/${slug}/index.md`
        : `/docs/${category}/${slug}/index.md`;
      
      let response = await fetch(indexPath);
      let finalPath = indexPath;
      
      // 如果index.md文件不存在，尝试加载直接的.md文件
      if (!response.ok) {
        const docPath = subcategory
          ? `/docs/${category}/${subcategory}/${slug}.md`
          : `/docs/${category}/${slug}.md`;
        
        response = await fetch(docPath);
        finalPath = docPath;
      }
      
      if (!response.ok) {
        throw new Error(`文档未找到: ${finalPath}`);
      }
      
      const content = await response.text();
      const parsedContent = this.parseMarkdown(content, category, subcategory, slug);
      
      return {
        state: 'success',
        data: parsedContent
      };
    } catch (error) {
      return {
        state: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * 解析Markdown内容
   */
  private parseMarkdown(content: string, category: string, subcategory: string | undefined, slug: string): DocumentContent {
    const { frontMatter, body } = this.parseFrontMatter(content);
    const toc = this.generateTOC(body);
    
    return {
      slug,
      title: frontMatter.title,
      description: frontMatter.description,
      content: body,
      frontMatter: {
        ...frontMatter,
        category,
        subcategory
      },
      toc,
      lastModified: frontMatter.lastModified
    };
  }

  /**
   * 解析Front Matter
   */
  private parseFrontMatter(content: string): { frontMatter: DocumentFrontMatter; body: string } {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      // 如果没有Front Matter，使用默认值
      return {
        frontMatter: {
          title: 'Untitled',
          category: 'unknown'
        },
        body: content
      };
    }
    
    const [, frontMatterStr, body] = match;
    const frontMatter = this.parseYAML(frontMatterStr);
    
    return { frontMatter, body };
  }

  /**
   * 简单的YAML解析器（仅支持基本键值对）
   */
  private parseYAML(yamlStr: string): DocumentFrontMatter {
    const lines = yamlStr.split('\n');
    const result: any = {};
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = trimmed.substring(0, colonIndex).trim();
      let value: string | string[] = trimmed.substring(colonIndex + 1).trim();
      
      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // 处理数组（简单实现）
      if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/["']/g, ''));
      }
      
      result[key] = value;
    }
    
    return result as DocumentFrontMatter;
  }

  /**
   * 生成目录（TOC）
   */
  private generateTOC(content: string): TableOfContentsItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = this.generateId(title);
      
      headings.push({
        id,
        title,
        level,
        children: []
      });
    }
    
    return this.buildTOCTree(headings);
  }

  /**
   * 构建TOC树结构
   */
  private buildTOCTree(headings: TableOfContentsItem[]): TableOfContentsItem[] {
    const root: TableOfContentsItem[] = [];
    const stack: TableOfContentsItem[] = [];
    
    for (const heading of headings) {
      // 找到合适的父级
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }
      
      if (stack.length === 0) {
        root.push(heading);
      } else {
        const parent = stack[stack.length - 1];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(heading);
      }
      
      stack.push(heading);
    }
    
    return root;
  }

  /**
   * 生成标题ID
   */
  private generateId(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * 获取所有分类的元数据
   */
  async loadAllCategories(): Promise<DocumentMeta> {
    return this.loadMeta('');
  }

  /**
   * 搜索文档
   */
  async searchDocuments(query: string, category?: string): Promise<any[]> {
    // 这里可以实现更复杂的搜索逻辑
    // 目前返回空数组，后续可以扩展
    return [];
  }
}