import { useMemo } from 'react'
import classnames from 'classnames'

const DOTS = '...'

const Pagination = props => {
	const {
		table,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
		onChangePage,
	} = props

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	})

	// If there are less than 2 times in pagination range we shall not render the component
	if (paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		// table.nextPage()
		if(onChangePage instanceof Function) onChangePage(currentPage + 1);
		// else
			// table.nextPage()
	}

	const onPrevious = () => {
		if(onChangePage instanceof Function) onChangePage(currentPage - 1);
		else
			table.previousPage()
	}
	return (
		<ul
			className={classnames('pagination-container', { [className]: className })}
		>
			{/* Left navigation arrow */}
			<li
				className={classnames('pagination-item', {
					disabled: currentPage <= 0,
				})}
				onClick={onPrevious}
			>
				<div className="arrow left" />
			</li>
			{paginationRange.map(pageNumber => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === DOTS) {
					return <li className="pagination-item dots">&#8230;</li>
				}

				// Render our Page Pills
				return (
					<li
						className={classnames('pagination-item', {
							selected: pageNumber === currentPage + 1,
						})}
						onClick={() => {
							// table.setPageIndex(pageNumber - 1)
							if(onChangePage instanceof Function) onChangePage(pageNumber - 1);
						}}
					>
						{pageNumber}
					</li>
				)
			})}
			{/*  Right Navigation arrow */}
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === paginationRange.length - 1,
				})}
				onClick={onNext}
			>
				<div className="arrow right" />
			</li>
		</ul>
	)
}

function usePagination({
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
}) {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize)

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5

		/*
			Case 1:
			If the number of pages is less than the page numbers we want to show in our
			paginationComponent, we return the range [1..totalPageCount]
		*/
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount)
		}

		/*
			Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
		*/
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		)

		/*
			We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
		*/
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPageCount

		/*
			Case 2: No left dots to show, but rights dots to be shown
		*/
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount
			let leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		/*
			Case 3: No right dots to show, but left dots to be shown
		*/
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount,
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		/*
			Case 4: Both left and right dots to be shown
		*/
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalCount, pageSize, siblingCount, currentPage])

	return paginationRange
}

function range(start, end) {
	let length = end - start + 1
	/*
		Create an array of certain length and set the elements within it from
		start value to end value.
	*/
	return Array.from({ length }, (_, idx) => idx + start)
}

export default Pagination
