import React, { useEffect, useRef } from "react";
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import './_custom.css'

export default function Date(props) {
    const { startDate, endDate, focusedInput, onDatesChange, onFocusChange } = props;
    const ref = useRef(null);

    useEffect(() => {
        ref.current.querySelector(".DayPicker").firstChild.firstChild.style.width = '37rem'

        const navs = ref.current.querySelectorAll(".DayPickerNavigation_button")
        let rightChevron = document.createElement('div');
        rightChevron.innerHTML = '<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: #000"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path></svg>'
        let leftChevron = document.createElement('div');
        leftChevron.innerHTML = '<svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: 10px; width: 10px; display: block; fill: #000"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path></svg>'
        navs[0].firstChild.style.display = 'none';
        navs[0].appendChild(leftChevron);
        navs[1].firstChild.style.display = 'none';
        navs[1].appendChild(rightChevron);

    }, [])

    return (
        <div ref={ref}>
            <DayPickerRangeController
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    )
}