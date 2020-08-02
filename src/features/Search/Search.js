import React from 'react';
import classes from './Search.module.css';
import StyledButton from '../../components/UI/StyledButton/StyledButton';
import classNames from 'classnames/bind'
import sprite from '../../assets/icons/sprite.svg';

const cx = classNames.bind(classes)

function Search(props) {
    return (
        <form onSubmit={() => {}} className={cx(classes.form, {formSearching: props.searching})}>
            <div className={`${classes.fieldBlock} ${classes.fieldBlockInput}`}>
                <div className={classes.field}>
                    <label className={cx(classes.label, {labelSearching: props.searching})}>
                        <div className={classes.buttonBox__title}>
                            Location
                        </div>
                        <input
                            type="text"
                            placeholder={'Where are you going?'}
                            className={classes.input}
                        />
                    </label>
                </div>
            </div>
            <div className={classes.sep} />
            <div className={classes.fieldBlock}>
                <div className={classes.field}>
                    <button className={cx(classes.button, {buttonSearching: props.searching})}>
                        <div className={classes.buttonBox__title}>
                            Dates
                        </div>
                        <div className={classes.buttonBox__selection}>
                            Add date
                        </div>
                    </button>
                </div>
            </div>
            <div className={classes.sep} />
            <div className={classes.fieldBlock}>
                <div className={classes.field}>
                    <button className={cx(classes.button, {buttonSearching: props.searching})}>
                        <div className={classes.buttonBox__title}>
                            Participants
                        </div>
                        <div className={classes.buttonBox__selection}>
                            Add participants
                        </div>
                    </button>
                </div>
            </div>
            <div className={classes.but}>
                <StyledButton rounded>
                    <svg>
                        <use href={sprite + '#icon-search'} />
                    </svg>
                    <span>Search</span>
                </StyledButton>
            </div>
        </form>
    );
}

export default Search;
