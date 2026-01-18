import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IconBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconbox : [
                {
                    id: 1,
                    icon: "autora-icon-quality",
                    title: "BEST QUALITY",
                    text: "Autora Construction Services are committed to meeting the highest quality standards without compromising our safety culture.."
                },
                {
                    id: 2,
                    icon: "autora-icon-time",
                    title: "ON TIME",
                    text: "Autora Construction Services are committed to meeting the highest quality standards without compromising our safety culture.."
                },
                {
                    id: 3,
                    icon: "autora-icon-author",
                    title: "EXPERIENCED",
                    text: "Autora Construction Services are committed to meeting the highest quality standards without compromising our safety culture.."
                }
            ]
        }
    }
    
    render() {
        return (
            <div className="row">
                {
                    this.state.iconbox.map(data => (
                        <div className="col-md-4" key={data.id}>
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={0} data-smobile={35} />
                            <div className="themesflat-content-box clearfix" data-margin="0 5px 0 5px" data-mobilemargin="0 0 0 0">
                                <div className="themesflat-icon-box icon-top align-center has-width w95 circle light-bg accent-color style-1 clearfix">
                                    <div className="icon-wrap">
                                        <i className={data.icon} />
                                    </div>
                                    <div className="text-wrap">
                                        <h5 className="heading"><Link to="#">{data.title}</Link></h5>
                                        <div className="sep clearfix" />
                                        <p className="sub-heading">{data.text}</p>
                                    </div>
                                </div>
                            </div>                                       
                        </div>  
                    ))
                }                    
            </div>
        );
    }
}

export default IconBox;