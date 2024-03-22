import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleBook } from "../utils/interfaces";

const Details = () => {
	const { id } = useParams();
	const [book, setBook] = useState<SingleBook>();
	const [genres, setGenres] = useState<string[]>([]);

	useEffect(() => {
		fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch detail");
				}
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setBook(data);
				if (data.volumeInfo.categories) {
					setGenres(
						data.volumeInfo.categories.map((category: string) =>
							category.replace(/\s*\/\s*/g, " ")
						)
					);
				}
			});
	}, [id]);

	return (
		<div>
			{book ? (
				<div className="md:flex md:flex-row w-full p-8 gap-8  items-center ">
					<div className="md:w-2/5  mb-8 ">
						{book.volumeInfo.imageLinks.large && (
							<img
								src={book.volumeInfo.imageLinks.large}
								alt="Book Cover"
								className="object-contain w-full h-full place-self-start "
							/>
						)}
					</div>
					<div className="md:w-3/5">
						<div className="border rounded-md p-8 flex flex-col gap-8">
							<div>
								<h1 className="text-lg font-bold mb-2">{book.volumeInfo.title}</h1>
								{book.volumeInfo.authors && <h1>{book.volumeInfo.authors.join(", ")}</h1>}

								{book.volumeInfo.publishedDate && (
									<p className="text-slate-500">
										(
										{book.volumeInfo.publishedDate.length > 4
											? book.volumeInfo.publishedDate.substring(0, 4)
											: book.volumeInfo.publishedDate}
										)
									</p>
								)}
							</div>
							<p>{book.volumeInfo.description}</p>
							<div>
								<p>Published by {book.volumeInfo.publisher}</p>
								{book.volumeInfo.printType && book.volumeInfo.pageCount && (
									<p className="text-slate-500">
										{book.volumeInfo.pageCount} pages,{" "}
										{book.volumeInfo.printType.toLocaleLowerCase()}
									</p>
								)}
							</div>
							{genres.length > 0 && (
								<div className="flex flex-row gap-2">
									<p className="font-bold">Genres: </p>
									<div>
										{genres.map((genre, index) => (
											<p className="border-b w-fit" key={index}>
												{genre}
											</p>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="w-full h-screen flex items-center justify-center">
					<span className="loading loading-dots loading-lg"></span>
				</div>
			)}
		</div>
	);
};

export default Details;
