import ConnectorBase from "./connector-base";

export default class Chucks extends ConnectorBase {

	constructor() {
		super();
		this.url = "http://chucks.jjshanks.net/draft";
		this.selector = "#draft_list tr";
		this.selectors = [{
			beer: '.draft_name',
			brewery: '.draft_brewery',
			location: ".draft_origin",
			price: ".draft_origin",
			abv: ".draft_abv"
		}];
	}
	
}