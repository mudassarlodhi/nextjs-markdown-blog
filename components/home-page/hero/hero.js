import Image from 'next/image';
import classes from './hero.module.css';

function Hero(){
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image 
                 src='/images/site/mudassar.jpg' 
                 alt='My Image' 
                 width={300} 
                 height={300} />
            </div>
            <h1>Hi I Am Mudassar</h1>
            <p>I write about web development experiences especially with JS technologies 
               like Angular, React, Next .........
            </p>
        </section>
    )
}

export default Hero;