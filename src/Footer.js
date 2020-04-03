import React from 'react';

const Footer = () => {
	return(
		<div>
			<footer className="page-footer font-small">
  				<div className="footer-copyright text-center py-3"> 
  					Made with <span style={{color: '#e25555'}}>&#9829;</span> by Ankit Shah
  					&copy; {new Date().getFullYear()}
  				</div>
			</footer>
		</div>
	);
}

export default Footer;