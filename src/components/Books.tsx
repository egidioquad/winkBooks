import { useEffect, useState } from "react";
import "./books.css";
import { BooksVolume } from "../utils/interfaces";
import { Link } from "react-router-dom";

const Books = () => {
	const [books, setBooks] = useState<BooksVolume>();
	const [searchTerm, setSearchTerm] = useState<string>();

	const [resPerPage, setResPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [order, setOrder] = useState("relevance");

	useEffect(() => {
		if (!searchTerm) return;
		setTotalPages(1);
		try {
			const startIndex = (currentPage - 1) * resPerPage;
			fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${resPerPage}&startIndex=${startIndex}&orderBy=${order}`
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch books");
					}
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setBooks(data);
					setTotalPages(Math.ceil(data.totalItems / resPerPage));
				});
		} catch (error) {
			console.error("Couldn't fetch Books:", error);
		}
	}, [searchTerm, order, resPerPage, currentPage]);

	const goToPage = (pageNumber: number) => {
		if (pageNumber < 1 || pageNumber - 1 > totalPages) return;
		else if (!books) return;
		setCurrentPage(pageNumber);
	};

	const displayedPageNumbers = calculateDisplayedPageNumbers(totalPages, currentPage);
	function calculateDisplayedPageNumbers(totalPages: number, currentPage: number) {
		const maxDisplayedPages = 5; // Limit to 7 displayed pages

		let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
		const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

		startPage = Math.max(1, Math.min(startPage, endPage - maxDisplayedPages + 1));

		const displayedNumbers = [];
		for (let i = startPage; i <= endPage; i++) {
			displayedNumbers.push(i);
		}

		return displayedNumbers;
	}
	return (
		<div className=" rounded-box ">
			<div className="pb-4 flex flex-col gap-2">
				<div>
					<h1 className="font-bold text-medium">Search a book</h1>
				</div>
				<div className="justify-between items-start flex flex-row gap-2">
					<input
						type="text"
						placeholder="Search For Books"
						className="input search-bar input-bordered bg-transparent w-full max-w-xs"
						onChange={(e) => setSearchTerm(e.target.value)}
						aria-label="Search For Books"
					/>
					<select
						className="select select-bordered bg-transparent w-1/3 max-w-xs"
						value={order}
						onChange={(e) => setOrder(e.target.value)}>
						<option disabled value="relevance">
							Order By
						</option>
						<option value="newest">Newest</option>
						<option value="relevance">Relevance</option>
					</select>
					<select
						className="select select-bordered bg-transparent w-1/3 max-w-xs"
						value={resPerPage}
						onChange={(e) => setResPerPage(Number(e.target.value))}>
						<option disabled value="5">
							Max Results:
						</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
					</select>
				</div>
			</div>
			{searchTerm && (
				<div>
					<div className="border rounded-md  px-4 py-2 mb-2   flex flex-row gap-4">
						<span className="w-[92px] text-center">Cover</span>
						<span className="w-1/5 text-start">Title</span>
						<span className="w-12 text-center">Year</span>
						<span className="w-1/5 text-end">Author</span>
						<span className="w-2/5 text-center">Description</span>
					</div>
					{books && books.totalItems > 0 ? (
						books.items.map((book) => (
							<Link key={book.id} to={`/books/${book.id}`}>
								<div className="border mb-1 rounded-lg w-full h-32 p-4 flex flex-row gap-4 justify-start items-center">
									{/* IMAGE */}
									<div className="w-[92px] h-full">
										{book.volumeInfo.imageLinks && (
											<img
												src={book.volumeInfo.imageLinks.thumbnail}
												alt="Book Cover"
												className="object-contain w-full h-full"
											/>
										)}
									</div>
									{/* TITLE */}
									<div className="w-1/5 truncate-2-lines">
										<div>{book.volumeInfo.title}</div>
									</div>
									{/* YEAR */}
									<div className="w-12 truncate-2-lines">
										{book.volumeInfo.publishedDate ? (
											<div>
												{book.volumeInfo.publishedDate.length > 4
													? book.volumeInfo.publishedDate.substring(0, 4)
													: book.volumeInfo.publishedDate}
											</div>
										) : (
											<span>####</span>
										)}
									</div>

									{/* AUTHOR */}
									<div className="text-sm text-end w-1/5 truncate-2-lines">
										{book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ? (
											<div>{book.volumeInfo.authors.join(", ")}</div>
										) : (
											<span>Unknown Author</span>
										)}
									</div>
									{/* DESCRIPTION */}
									<div className="w-2/5 text-xs text-center truncate-2-lines">
										{book.volumeInfo.description ? (
											<span>{book.volumeInfo.description}</span>
										) : (
											<span>No description available</span>
										)}
									</div>
								</div>
							</Link>
						))
					) : (
						<span>No Results Found</span>
					)}
				</div>
			)}
			{!searchTerm && (
				<div className="items-center justify-center flex text-center border border-slate-500 rounded-lg w-full h-40 p-4  text-slate-500">
					<div>Please enter a search term to get started</div>
				</div>
			)}

			{/* PAGINATION */}
			<div className="justify-end my-4 items-center">
				{displayedPageNumbers.map((pageNumber: number) => (
					<button
						className={`btn mx-1 ${pageNumber === currentPage ? "glass" : ""}`}
						onClick={() => goToPage(pageNumber)}>
						{pageNumber}
					</button>
				))}
				<button className="btn-disabled btn">...</button>
				{totalPages > 1 && (
					<button
						className={`btn  mx-1 ${totalPages === currentPage ? "btn-primary" : ""}`}
						/* onClick={() => goToPage(Number(totalPages))} */
					>
						{totalPages}
					</button>
				)}
			</div>
		</div>
	);
};

export default Books;
