import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import classes from "../kgpmap.module.css"

function Marker({ text }) {
	return (
		<Tooltip title={text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function GoogleMaps() {
	return (
		<div>
			<div>
            <iframe  className={classes.mapc} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6207.4353488086235!2d87.30406278761689!3d22.317233689703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4407422c1675%3A0xa2d9d15d09ca4c4!2sTechnology%20Students&#39;%20Gymkhana!5e0!3m2!1sen!2sin!4v1642419833477!5m2!1sen!2sin" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe>
			</div>
		</div>
	);
}

export default GoogleMaps;
