import React from "react";
import classes from './Pagination.module.css'
import Justicon from "../UI/JustIcon/Justicon";

export const Pagination = ({
    loading,
    paginate,
    hasPrevPage,
    prevPage,
    page,
    nextPage,
    totalPages,
    hasMore
}) => {
    return (
        <div className={classes.paginate}>
            {hasPrevPage && (
                <button className={classes.nextButton}
                        onClick={e => paginate(e, prevPage)}
                        disabled={loading}>
                    <Justicon icon={'chevron-left'} className={classes.nextIcon}/>
                </button>
            )}
            {page > 3 && (
                <>
                    <button className={classes.page}
                            onClick={e => paginate(e, 1)}
                            disabled={loading}>
                        1
                    </button>
                    <div>
                        <h2>...</h2>
                    </div>
                </>
            )}
            {page - 2 > 1 && (
                <button className={classes.page}
                        onClick={e => paginate(e, page - 1)}
                        disabled={loading}>
                    {page - 1}
                </button>
            )}
            {hasMore && <button className={classes.pageActive} disabled={true}>{page}</button>}
            {page + 2 < totalPages && (
                <button className={classes.page}
                        onClick={e => paginate(e, page + 1)}
                        disabled={loading}>
                    {page + 1}
                </button>
            )}
            {hasMore && totalPages - 1 > page && (
                <>
                    <div>
                        <h2>...</h2>
                    </div>
                    <button className={classes.page}
                            onClick={e => paginate(e, totalPages)}
                            disabled={loading}>
                        {totalPages}
                    </button>
                </>
            )}
            {hasMore && (
                <button className={classes.nextButton}
                        onClick={e => paginate(e, nextPage)}
                        disabled={loading}>
                    <Justicon icon={'chevron-right'} className={classes.nextIcon}/>
                </button>
            )}
        </div>
    )
}