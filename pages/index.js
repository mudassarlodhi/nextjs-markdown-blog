import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts/featured-posts";
import Hero from "../components/home-page/hero/hero";
import { getfeaturedPosts } from "../lib/post-util";

function HomePage(props){
    return (
        <Fragment>
            <Head>
                <title>Mudasser Blog</title>
                <meta name='description' content='I post about programming and web development' />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    )
}


export function getStaticProps(){
  const featuredPosts = getfeaturedPosts();
  return {
    props: { 
      posts: featuredPosts
    }
  }
}

export default HomePage;