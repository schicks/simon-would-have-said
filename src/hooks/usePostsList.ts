import { useStaticQuery, graphql } from "gatsby"


type PostDTO = {
    node: {
        slug: string,
        frontmatter: {
            title: string,
            date: string
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
}

const formatPostData = ({ node: { slug, frontmatter: { title, date } } }: PostDTO): Post => ({
    slug,
    title,
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
            }
          }
        }
      }
    }
  `)

    return posts.map(formatPostData)
}