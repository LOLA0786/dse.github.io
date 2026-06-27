import { Link } from "react-router-dom";

export default function Navbar(){

const links=[
["/","Home"],
["/framework","Framework"],
["/whitepaper","Whitepaper"],
["/research","Research"],
["/docs","Docs"],
["/about","About"]
];

return(

<nav className="navbar">

<div className="logo">

<Link to="/">Decision Security Engineering</Link>

</div>

<div className="nav-links">

{links.map(([to,label])=>(
<Link key={to} to={to}>{label}</Link>
))}

<a
href="https://github.com/LOLA0786/PrivateVault.ai"
target="_blank"
rel="noreferrer"
>
GitHub
</a>

</div>

</nav>

);

}
