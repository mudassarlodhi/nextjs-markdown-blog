import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/post-util";

function PostDetailPage(props){
    return (
    <Fragment>
        <Head>
            <title>{props.post.title}</title>
            <meta name='description' content={props.post.excerpt} />
        </Head>
        <PostContent post={props.post} />
    </Fragment>
    )
}

export function getStaticProps(context){
    const slug = context.params.slug;
    const postData = getPostData(slug);
    return {
        props: { 
            post: postData
        },
        revalidate: 600
    }
}

export function getStaticPaths(){
    const fileNames = getPostFiles();
    
    const slugs = fileNames.map(fileName=>({
        params: { slug: fileName.replace(/\.md$/, '') }
    }));

    return {
        paths: slugs,
        fallback:'blocking'
    }
}

export default PostDetailPage;