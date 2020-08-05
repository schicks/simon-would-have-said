import { useStaticQuery, graphql } from "gatsby"


type PostDTO = {
    node: {
        slug: string,
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
}

const formatPostData = ({ node: { slug, frontmatter: { title, date, status } } }: PostDTO): Post => ({
    slug,
    title,
    status,
    date: new Date(date)
})

export default (): Post[] => {
    const { allMdx: { edges: posts } }: AllPostsResponse = useStaticQuery(graphql`
    query allPosts {
      allMdx {
        edges {
          node {
            slug
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