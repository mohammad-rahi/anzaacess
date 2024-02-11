import React from 'react'

const BlogDetailsPage = ({ params: { blog_slug } }: { params: { blog_slug: string } }) => {
    return (
        <div>{blog_slug}</div>
    )
}

export default BlogDetailsPage