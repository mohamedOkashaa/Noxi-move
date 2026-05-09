import React, { useContext } from 'react'
import { TrendingContext } from '../store'
import styles from './Pagination.module.css'

export default function Pagination() {
    let { pageNumber, setPageNumber, totalPages } = useContext(TrendingContext);

    // create pages around current page (current ± 2)
    function getPages() {
        let pages = [];
        for (
            let i = Math.max(1, pageNumber - 2);
            i <= Math.min(totalPages, pageNumber + 2);
            i++
        ) {
            pages.push(i);
        }
        return pages;
    }

    return (
        <div className={styles.container}>

            {/* previous page button */}
            <button
                className={styles.nav}
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber === 1}
            >
                Prev
            </button>

            {/* page numbers */}
            {getPages().map((num) =>
                <button
                    key={num}
                    className={pageNumber === num ? styles.active : styles.btn}
                    onClick={() => setPageNumber(num)}
                >
                    {num}
                </button>
            )}

            {/* current page / total pages display */}
            <div className={styles.pageBox}>
                <span>{pageNumber} / {totalPages}</span>
            </div>

            {/* next page button */}
            <button
                className={styles.nav}
                onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPages))}
                disabled={pageNumber === totalPages}
            >
                Next
            </button>

        </div>
    )
}