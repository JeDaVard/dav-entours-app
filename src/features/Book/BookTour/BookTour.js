import React, {useState} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import qs from 'query-string';
import classes from './BookTour.module.css';
import SimpleMobileTop from "../../../components/SimpleMobileTop/SimpleMobileTop";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_TOUR_FOR_ORDER } from "./queries";
import moment from "moment";
import Separator from "../../../components/UI/Separator/Separator";
import {useSelector} from "react-redux";
import StyledButton from "../../../components/UI/StyledButton/StyledButton";
import ScrollToTop from "../../../components/UI/ScrollToTop";
import AuthorInfo from "./AuthorInfo";
import FakeConversation from "./FakeConversation";
import OrderItemHead from "./OrderItemHead";
import DatePrice from "./DatePrice";
import TourParticipants from "./TourParticipants";
import TopLoading from "../../../components/UI/TopLoading/TopLoading";


function BookTour() {
    // Tour and tour start infos pass to booking center with query params
    const { location } = useHistory();
    const parsedData = qs.parse(location.search);
    // price to calculated (only for UX, not to be sent to the server)
    const [ price, setPrice ] = useState(0)
    // Make UI based on device
    const isMobile = useSelector(s => s.ui.display.isMobile);
    // Users first message to be passed with order
    const [ message, setMessage ] = useState('');

    const [initialQuery] = useState(location.state);

    // Fetch tour based on query
    const { data, loading, error } = useQuery(FETCH_TOUR_FOR_ORDER, {
        variables: { id: parsedData.slug },
        onCompleted: () => {
            setPrice(data.tour.price)
        }
    });


    if (loading) return <TopLoading />
    if (error) return <h1>{error.message}</h1>
    if (!data || !initialQuery) {
        if (parsedData.slug) {
            return <Redirect to={`/tour/${parsedData.slug}`} />
        }
    }

    const { tour, me } = data;

    // Find start object based on query's startId
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
                        <OrderItemHead tour={tour}/>
                        <div className={classes.participation}>
                            <div className={classes.date}>
                                <DatePrice price={price} singlePrice={tour.price} date={start.date}/>
                            </div>
                            <Separator margin={'2 2'} />
                            <div className={classes.joined}>
                                <p>People joined to this date with you</p>
                            </div>
                            <TourParticipants me={me}
                                              query={initialQuery}
                                              singlePrice={tour.price}
                                              setPrice={setPrice}
                                              start={start}/>
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
                        <FakeConversation setMessage={setMessage} one={tour.author} second={me} />
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
                   <StyledButton to={loc => ({...loc, pathname: '/payments/book/pay', state: {initialQuery, message }})}>
                       {/*<img src={locker} className={classes.payIcon}  alt="secure"/>*/}
                       <span>Confirm and Pay	&rarr;</span>
                   </StyledButton>
               </div>
           </div>
        </div>
    )
}

export default BookTour