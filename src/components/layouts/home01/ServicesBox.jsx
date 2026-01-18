import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ServicesBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardbox: [
                {
                    id: 1,
                    colspan: [
                        {
                            idx: 1,
                            icon: 'autora-icon-build',
                            title: 'DESIGN-BUILD',
                            text: 'We develop and understand project expectations and then manage those needs with a design team. Innovation should happen throughout a project.'
                        }
                    ],
                    colleft: [
                        {
                            idx: 1,
                            icon: 'autora-icon-hat-outline',
                            title: 'PRECONSTRUCTION SERVICES',
                            text: 'Autora Construction Services provides the right resources and expertise to evaluate concepts through our industry leading Preconstruction Services team.',
                        }
                    ]
                },
                {
                    id: 2,
                    colspan: [
                        {
                            idx: 1,
                            icon: 'autora-icon-author-outline',
                            title: 'CONSTRUCTION MANAGEMENT',
                            text: 'We work closely with architects and designers to understand the project, and ultimately develop a targeted solution that optimizes every stage of the build.'
                        }
                    ],
                    colleft: [
                        {
                            idx: 1,
                            icon: 'autora-icon-build-home',
                            title: 'BUILDING ENVELOPES',
                            text: 'Our in-house cladding teams supply and install a diverse range of solutions to new building and building envelope upgrade projects.',
                        }
                    ]
                },
                {
                    id: 3,
                    colspan: [
                        {
                            idx: 1,
                            icon: 'autora-icon-building-outline',
                            title: 'METAL BUILDING SERVICES',
                            text: 'In the past decade alone, we have completed more than 5 million square feet of metal building systems in Western Canada and US'
                        }
                    ],
                    colleft: [
                        {
                            idx: 1,
                            icon: 'autora-icon-hat-outline',
                            title: 'CONCRETE STRUCTURES',
                            text: 'We employs a talented team of industry leading professionals capable of self-performing complex concrete work, considered on a project specific basis',
                        }
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div className="themesflat-row gutter-30 clearfix">
                {
                    this.state.cardbox.map(data => (
                        <div className="col span_1_of_4" key={data.id}>
                            <div className="themesflat-spacer clearfix" data-desktop={0} data-mobile={35} data-smobile={35} />
                            {
                                data.colspan.map( spandata =>(
                                    <div className="themesflat-icon-box icon-left accent-color style-2 clearfix" key={spandata.idx}>
                                        <div className="icon-wrap">
                                            <i className={spandata.icon} />
                                        </div>
                                        <div className="text-wrap">
                                            <h5 className="heading"><Link to="#">{spandata.title}</Link></h5>
                                            <p className="sub-heading">{spandata.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="themesflat-spacer clearfix" data-desktop={62} data-mobile={35} data-smobile={35} />
                            {
                                data.colleft.map(leftcol => (
                                    <div className="themesflat-icon-box icon-left accent-color style-2 clearfix" key={leftcol.idx}>
                                        <div className="icon-wrap font-size-35 line-height-50">
                                            <i className={leftcol.icon}/>
                                        </div>
                                        <div className="text-wrap">
                                            <h5 className="heading"><Link to="#">{leftcol.title}</Link></h5>
                                            <p className="sub-heading margin-top-18">{leftcol.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ServicesBox;