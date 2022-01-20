import PostHeader from "./post-header";
import classes from './post-content.module.css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

SyntaxHighlighter.registerLanguage('js' , js);
SyntaxHighlighter.registerLanguage('css' , css);

function PostContent({ post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    const customRenderers = {
        // img:(image)=>{
        //     return <Image 
        //     src={`/images/posts/${post.slug}/${image.src}`} 
        //     alt={image.alt}
        //     width={600}
        //     height={300}  />
        // }
        p: (paragraph) => {
            if (paragraph.children[0].type === 'img') {
                const image = paragraph.children[0].props;
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.src}`}
                            alt={image.alt}
                            width={600}
                            height={300} />
                    </div>
                )
            }
            else {
                return <p>{paragraph.children}</p>
            }
        },
        code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || '')
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                >
                    { children }
                </SyntaxHighlighter>
            )
        }
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent;