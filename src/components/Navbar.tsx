import { Link } from "react-router-dom";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

interface NavbarProps {
	toggleTheme: () => void;
	isDarkTheme: boolean;
}
export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkTheme }) => {
	return (
		<div>
			<div className="navbar shadow-lg px-10 py-2 ">
				<div className="flex-1">
					<Link to={"/"}>
						<button className="btn btn-ghost text-xl">Wink Library 📚</button>{" "}
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal gap-2 ">
						<button
							onClick={() => window.open("https://github.com/egidioquad", "_blank")}
							className="btn">
							My GitHub
						</button>

						{!isDarkTheme && (
							<button className="btn" onClick={toggleTheme}>
								LightTheme
								<MdOutlineWbSunny />
							</button>
						)}
						{isDarkTheme && (
							<button className="btn" onClick={toggleTheme}>
								Dark Theme <IoMoon />
							</button>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
