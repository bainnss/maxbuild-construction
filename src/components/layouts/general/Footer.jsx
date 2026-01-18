import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class Footer extends Component {
    render() {
        return (
            <footer id="footer" className="clearfix">
                <div id="footer-widgets" className="container">
                    <div className="themesflat-row gutter-30">
                        <div className="col span_1_of_3">
                            <div className="widget widget_text">
                                <div className="textwidget">
                                    <p>
                                        <img src="assets/img/MAXBUILD.png" alt="imagealt" width={170} height={34} />
                                    </p>
                                    <p className="margin-bottom-15">We have over 15 years of experien able to help you 24 hours a
                                        day.</p>
                                    <ul>
                                        <li>
                                            <div className="inner">
                                                <span className="fa fa-map-marker" />
                                                <span className="text">PO BOX 16122 COLLINS STREET <span className="sl">West
                                                        Victoria, NewYork</span></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="inner">
                                                <span className="fa fa-phone" />
                                                <span className="text">CALL US : (+61) 3 8376 6284</span>
                                            </div>
                                        </li>
                                        <li className="margin-top-7">
                                            <div className="inner">
                                                <span className=" font-size-14 fa fa-envelope" />
                                                <span className="text">SUPPORT@NICHE_THEME</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>{/* /.widget_text */}
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={0} data-smobile={35} />
                        </div>{/* /.col */}
                        <div className="col span_1_of_3">
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={0} data-smobile={0} />
                            <div className="widget widget_lastest">
                                <h2 className="widget-title"><span>RECENT POSTS</span></h2>
                                <ul className="lastest-posts data-effect clearfix">
                                    <li className="clearfix">
                                        <div className="thumb data-effect-item has-effect-icon">
                                            <img src="assets/img/news/post-1-65x65.jpg" alt="imagealt" />
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <Link to="page-blog-single.html" className="icon-2" />
                                            </div>
                                        </div>
                                        <div className="text">
                                            <h3><Link to="page-blog-single.html">SMART BUILDING WITH CONCRETE SUSTAINABLE</Link></h3>
                                            <span className="post-date"><span className="entry-date">29 June 2018</span></span>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="thumb data-effect-item has-effect-icon">
                                            <img src="assets/img/news/post-2-65x65.jpg" alt="imagealt" />
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <Link to="page-blog-single.html" className="icon-2" />
                                            </div>
                                        </div>
                                        <div className="text">
                                            <h3><Link to="page-blog-single.html">HI-TECH WOODEN HOUSE BUILT WITHOUT GLUE</Link></h3>
                                            <span className="post-date"><span className="entry-date">31 June 2018</span></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>{/* /.widget_lastest */}
                        </div>{/* /.col */}
                        <div className="col span_1_of_3">
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={35} data-smobile={35} />
                            <div className="widget widget_tags">
                                <h2 className="widget-title margin-bottom-30"><span>TAGS</span></h2>
                                <div className="tags-list">
                                    <Link to="#">Building</Link>
                                    <Link to="#">Smart House</Link>
                                    <Link to="#">Costruction</Link>
                                    <Link to="#">Villa</Link>
                                    <Link to="#">Residential</Link>
                                    <Link to="#">Interior</Link>
                                    <Link to="#">Resort</Link>
                                    <Link to="#">Commercial</Link>
                                </div>
                            </div>
                        </div>{/* /.col */}
                        <div className="col span_1_of_3">
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={35} data-smobile={35} />
                            <div className="widget widget_instagram">
                                <h2 className="widget-title margin-bottom-30"><span>INSTAGRAM PHOTOS</span></h2>
                                <div className="instagram-wrap data-effect clearfix col3 g10">
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-1-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-2-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-3-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-4-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-5-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="instagram_badge_image has-effect-icon">
                                        <Link to="#" target="_blank" className="data-effect-item">
                                            <span className="item"><img src="assets/img/instagram/instagram-6-83x83.jpg"
                                                    alt="imagealt" /></span>
                                            <div className="overlay-effect bg-color-2" />
                                            <div className="elm-link">
                                                <span className="icon-3" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;