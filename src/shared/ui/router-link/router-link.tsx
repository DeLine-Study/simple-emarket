import { Link } from "@tanstack/react-router";
import "./styles.css";

export const RouterLink: typeof Link = (props) => (
  <Link {...props} className={`link ${props.className}`} />
);
