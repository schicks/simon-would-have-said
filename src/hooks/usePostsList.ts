import { useStaticQuery, graphql } from "gatsby"


type PostDTO = {
    node: {
        slug: string,
        excerpt: string,
        frontmatter: {
            title: string,
            date: string,
            status: 'draft' | 'published'
        }
    }
}
type AllPostsResponse = {
    allMdx: {
        edges: PostDTO[]
    }
}

type Post = {
    title: string,
    date: Date,
    slug: string
    status: 'draft' | 'published'
    excerpt: string
}

const formatPostData = ({ node: { excerpt, slug, frontmatter: { title, date, status } } }: PostDTO): Post => ({
    slug,
    title,
    status,
    date: new Date(date),
    excerpt
})

export default (): Post[] => {
    const { allMdx: { edges: posts } }: AllPostsResponse = useStaticQuery(graphql`
    query allPosts {
      allMdx {
        edges {
          node {
            slug
            excerpt(pruneLength: 250, truncate: true)
            frontmatter {
              title
              date
              status
            }
          }
        }
      }
    }
  `)

    return posts.map(formatPostData)
}