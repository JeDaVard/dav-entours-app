import React from 'react';
import classes from './Random.module.css';
import RandomItem from './RandomItem';
import RandomItemLoading from './RandomItemLoading';

function Random(props) {
    return (
        <section className={classes.Random}>
            <div className="row">
                <div className={classes.Random__top}>
                    <div className={classes.Random__title}>
                        <h2>Introducing Best Tours</h2>
                        <p>
                            Now you can meet people all over the world while
                            trying something new. Join live, interactive video
                            sessions led by expert hosts—all without leaving
                            home.
                        </p>
                    </div>
                    <div className={classes.Random__button}>
                        <button>Show more</button>
                    </div>
                </div>

                {/*{!props.randoms.loading && props.randoms.data.length ? (*/}
                {/*    <div className={classes.Random__grid}>*/}
                {/*        {props.randoms.data.slice(0,4).map( random => <RandomItem tour={random} key={random._id}/>)}*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <RandomItemLoading />*/}
                {/*)}*/}
                <div className="_1236fxm" style={{gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
                    <div className="_59mwg2" style={{gridArea: '1 / 1 / auto / auto'}}>
                        <a target="_blank"
                           href="/experiences/1652939"
                           className="_192cr6q3">
                        <div className="_1trgpf1">
                            <div className="_hxt6u1e">
                                <div className="_4626ulj">
                                    <picture>
                                        <source
                                            srcSet="https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=320 1x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=720 2x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=960 3x"
                                            media="(max-width: 743px)" />
                                            <source
                                                srcSet="https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=320 1x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=720 2x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=1200 3x"
                                                media="(max-width: 1127px)" />
                                                <source
                                                    srcSet="https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=480 1x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=1200 2x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=1680 3x"
                                                    media="(max-width: 1439px)" />
                                                    <source
                                                        srcSet="https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=720 1x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=1680 2x, https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=1920 3x"
                                                        media="(min-width: 1440px)" />
                                                        <img className="_1cb9q3xq"
                                                             src="https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?im_w=720"
                                                             style={{objectFit: 'cover', borderRadius: '16px'}} />
                                    </picture>
                                    {/*<div className="_10xjrv2u"*/}
                                    {/*     style="background-image: url(&quot;https://a0.muscache.com/im/pictures/0049c173-7313-42c5-9330-543ed4cb8d7d.jpg?aki_policy=large&quot;); background-size: cover; border-radius: 16px;"> </div>*/}
                                </div>
                            </div>
                            <div className="_1ytpddv">
                                <div className="_1qb7qc8">
                                    <div style={{width: '50%'}}>Mix secret sangria with Pedro from&nbsp;Lisbon</div>
                                </div>
                            </div>
                        </div>
                    </a></div>

                </div>
            </div>
        </section>
    );
}

export default Random;
