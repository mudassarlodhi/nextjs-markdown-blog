import Image from 'next/image';
import classes from "./post-item.module.css";
import Link from 'next/link';

function PostItem(props){
    const { title, date, excerpt, image, slug } = props.post;
    
    const formattedDate = new Date(date).toLocaleDateString('en-US' , {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const linkPath = `/posts/${slug}`; 
    const imagePath = `/images/posts/${slug}/${image}`;

    return ( <li className={classes.post}>
        <Link href={linkPath}>
           <a>
               <div>
                   <Image src={imagePath} alt={title} width={300} height={200} layout="responsive"  />
               </div>
               <div className={classes.content}>
                   <h3>{ title }</h3>
                   <time>{ formattedDate }</time>
                   <p>{ excerpt }</p>
               </div>
           </a>
        </Link>
    </li>)
}

export default PostItem;