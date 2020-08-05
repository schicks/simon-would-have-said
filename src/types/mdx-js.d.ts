declare module "@mdx-js/react" {
  type Component = 
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'thematicBreak'
    | 'blockquote'
    | 'ul'
    | 'ol'
    | 'li'
    | 'table'
    | 'tr'
    | 'td'
    | 'th'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'delete'
    | 'hr'
    | 'a'
    | 'img'
    | 'p'
  const MDXProvider: React.ComponentType<{
    components?: {[key in Component]?: React.ComponentType<Record>}
    children: React.ReactNode
  }>;
  export { MDXProvider };
}
