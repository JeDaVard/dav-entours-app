import React from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import qs from 'query-string';
import classes from './BookTour.module.css';
import SimpleMobileTop from "../../components/SimpleMobileTop/SimpleMobileTop";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_TOUR_FOR_ORDER} from "./queries";
import SmoothImage from "../../components/UI/ImageLoading/SmoothImage";
import LocLink from "../../components/UI/LocLink/LocLink";
import Justicon from "../../components/UI/JustIcon/Justicon";
import moment from "moment";
import Separator from "../../components/UI/Separator/Separator";
import SmallShow from "../../components/UI/SmallShow/SmallShow";
import {useSelector} from "react-redux";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import locker from "../../assets/icons/locker.svg";
import ScrollToTop from "../../components/UI/ScrollToTop";
import ShowAllMembers from "../TourContainer/TourOrder/ShowAllMembers";
import {Form, Input} from "../../components/UI/LabeledInput/LabeledInput";
import AuthorInfo from "./AuthorInfo";
import FakeConversation from "./FakeConversation";

function BookTour() {
    const { location } = useHistory();
    const parsedData = qs.parse(location.search);

    const isMobile = useSelector(s => s.ui.display.isMobile)

    const { data, error, loading } = useQuery(FETCH_TOUR_FOR_ORDER, {
        variables: { id: parsedData.slug }
    })
    if (!parsedData.slug || !parsedData.start) return <Redirect to={'/'}/>

if (loading) return <p>loading...</p>
    const { tour, me } = data;

    const start = data.tour.starts.find(start => start._id === parsedData.start);

    return (
        <div className={classes.main}>
            <ScrollToTop />
            {isMobile
                ? <SimpleMobileTop
                    to={`/mytours`}
                    icon={'check'}
                    children={'Order'}
                    shadow
                    fixed
                    top/>
                : <div>
                    <div className={classes.bookingCenter}>
                        <h2>Booking Service</h2>
                    </div>
                    <Separator color={'normal'} margin={'1 2'}/>
                </div>}
                <div className={classes.content}>

                    <div className={classes.tour}>
                        <div className={classes.details}>
                            <div className={classes.imageFrame}>
                                <SmoothImage src={tour.imageCover}
                                             className={classes.image}
                                             alt={tour.name}/>
                                <div className={classes.gradient}/>
                            </div>
                            <div className={classes.info}>
                                <div className={classes.nameFrame}>
                                    <h2 className={classes.name}>{tour.name.slice(0,16)+'...'}</h2>
                                    <LocLink
                                        className={classes.loc}
                                        address={tour.startLocation.address.length > 30
                                            ? tour.startLocation.address.slice(0,30)+'...'
                                            : tour.startLocation.address}
                                        coordinates={['asd']}/>
                                </div>
                                <div className={classes.rating}>
                                    <Justicon icon={'star'} />
                                    <p><b>&nbsp;{tour.ratingsAverage}</b>&nbsp;({tour.ratingsQuantity})</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.participation}>
                            <div className={classes.date}>
                                <div className={classes.time}>
                                    <div className={classes.timeIcon}>
                                        <Justicon icon={'calendar'} className={classes.icon}/><p>&nbsp;Date</p>
                                    </div>
                                    <p>{moment(+start.date).format('dd, DD MMM, hh:mm A')}</p>
                                </div>
                                <div className={classes.datePrice}>
                                    <div className={classes.datePriceIcon}>
                                        <Justicon icon={'dollar-sign'} className={classes.icon}/><p>&nbsp;Price</p>
                                    </div>
                                    <p>${tour.price} per person</p>
                                </div>
                                <div className={classes.datePrice}>
                                    <div className={classes.datePriceIcon}>
                                        <Justicon icon={'users'} className={classes.icon}/><p>&nbsp;By members</p>
                                    </div>
                                    <p>${tour.price}</p>
                                </div>
                                <div className={classes.datePrice}>
                                    <div className={classes.datePriceIcon}>
                                        <Justicon icon={'database'} className={classes.icon}/><p>&nbsp;Fee</p>
                                    </div>
                                    <p style={{color: 'green'}}>+${tour.price*8/100}</p>
                                </div>
                                <div className={classes.datePrice}>
                                    <div className={classes.datePriceIcon}>
                                        <Justicon icon={'credit-card'} className={classes.icon}/><p>&nbsp;Total(USD)</p>
                                    </div>
                                    <p><b>${tour.price + (tour.price*8/100)}</b></p>
                                </div>
                            </div>
                            <Separator margin={'1 1'} />
                            <div className={classes.joined}>
                                <p>People joined to this date with you</p>
                            </div>
                            <div className={classes.participants}>
                                <div className={classes.addGuest}>
                                    <SmallShow
                                        handler={(trigger, opposite) => trigger(!opposite)}
                                        button={(
                                            <div className={classes.invite}>
                                                <Justicon
                                                    className={classes.inviteIcon}
                                                    icon={'plus'} />
                                            </div>
                                        )}>
                                        <div className={classes.inviteBlock}>
                                            <div className={classes.inviteHead}>
                                                <h2>Invite a member</h2>
                                            </div>
                                            <Separator color={'normal'} />
                                            <Form>
                                                <Input
                                                    type='email'
                                                    name="guestEmail"
                                                    label="E-mail"
                                                    id="inviteGuestEmail"
                                                    // value={state.summary}
                                                    // onChange={onInputChange}
                                                    inputDescription="Come with your friend or family member,
                                                    just add their account and pay"
                                                />
                                            </Form>
                                        </div>
                                    </SmallShow>
                                    <img src={process.env.REACT_APP_SERVER+'/images/user/'+me.photo}
                                         alt={me.name}
                                         className={classes.user}/>
                                </div>
                                <div className={classes.members}>
                                    {start.participants.slice(0,5).map(p => (
                                        <img src={process.env.REACT_APP_SERVER+'/images/user/'+p.photo}
                                             key={p._id}
                                             alt={p.name}
                                             className={classes.user}/>
                                    ))}
                                    <ShowAllMembers start={start} />
                                </div>
                            </div>
                            <div className={classes.inviteNote}>
                                <p>You can buy more places if you want to go with someone,
                                    just click add, and he/she will be here with you (price will be recalculated)</p>
                            </div>
                        </div>
                    {isMobile && <Separator margin={'1 1'} color='normal' height={2}/>}
                    </div>

                    <div className={classes.conv}>
                        <AuthorInfo author={tour.author}/>
                        <Separator margin={'2 2'} color='normal'/>
                        <div className={classes.convHead}>
                            <h1>Say hello to {tour.author.name.split(' ')[0]} and other members</h1>
                            <h2>Let them know a little about yourself and why you’re coming.</h2>
                        </div>
                        <FakeConversation one={tour.author} second={me} />
                    </div>
                </div>

            {isMobile && <Separator margin={'1 1'} color='normal' height={2}/>}
           <div className={classes.payment}>
               <div className={classes.bottomInfos}>
                   <div className={classes.cancellation}>
                       <h3>Cancellation policy</h3>
                       <p>
                           Cancel before {moment(start.date-84600).format('hh:mm A DD MMM')}  and get a full refund.
                           After that, 80% of the price, <b>${tour.price-tour.price*20/100}</b> minus the service fee.
                       </p>
                   </div>
                   <div className={classes.policy}>
                       <p>
                           By selecting the button below, I agree to all rules, <b>Cancellation Policy</b>, and the <b>Refund Policy</b>.
                           I also agree to pay the total amount shown, which includes <b>Service Fees</b>.
                       </p>
                   </div>
               </div>

               <div className={classes.payButton}>
                   <StyledButton>
                       <img src={locker} className={classes.payIcon}  alt="secure"/>
                       <span>Confirm and Pay</span>
                   </StyledButton>
               </div>
           </div>
        </div>
    )
}

export default BookTour