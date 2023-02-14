import { ReactComponent as GithubLogo } from "@assets/images/github-mark.svg";

export default function GithubLink() {
	return (
		<a
			className="github"
			href="https://github.com/ozzy1136/rock-paper-scissors"
		>
			<span>View on GitHub</span>
			<GithubLogo className="github-logo" />
		</a>
	);
}
