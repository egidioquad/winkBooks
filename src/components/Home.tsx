import Books from "./Books";

const Home = () => {
	return (
		<div>
			<div className="main size-full">
				<div className=" 2xl:grid sm:grid-cols-1 2xl:grid-cols-3 items-center   md:mx-28 lg:mx-36 xl:mx-44 lg:gap-8">
					<div className="2xl:col-span-1 p-8 border  border-slate-500 rounded-box place-self-start lg:max-w-lg mx-auto mb-20 ">
						<h1 className="text-xl font-bold mb-1">Hello Wink Team!</h1>
						<span className="text-lg">My name is</span>
						<span className="text-lg font-bold"> Egidio Quadrini </span>
						<span className="text-lg">
							and this is my implementation of a basic Book Information Database following the PDF
							guidelines
						</span>
					</div>
					<div className="2xl:col-span-2 sm:p-4 lg:p-8 ">
						<Books />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
