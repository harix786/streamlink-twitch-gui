import {
	get,
	getWithDefault,
	computed
} from "ember";
import { twitch } from "config";
import { openBrowser } from "nwjs/Shell";
import ListItemComponent from "components/list/ListItemComponent";
import Moment from "moment";
import layout from "templates/components/list/SubscriptionItemComponent.hbs";


const { alias } = computed;
const {
	subscription: {
		"edit-url": subscriptionEditUrl,
		"cancel-url": subscriptionCancelUrl
	}
} = twitch;


export default ListItemComponent.extend({
	layout,

	classNames: [ "subscription-item-component" ],
	attributeBindings: [ "style" ],

	product  : alias( "content.product" ),
	channel  : alias( "product.channel" ),
	emoticons: alias( "product.emoticons" ),

	style: computed( "channel.profile_banner", "channel.video_banner", function() {
		const banner = getWithDefault( this,
			"channel.profile_banner",
			getWithDefault( this, "channel.video_banner", "" )
		);

		return ( `background-image:url("${banner}")` ).htmlSafe();
	}),

	hasEnded: computed( "content.access_end", function() {
		const access_end = get( this, "content.access_end" );

		return new Date() > access_end;
	}).volatile(),

	ends: computed( "content.access_end", function() {
		const access_end = get( this, "content.access_end" );

		return new Moment().to( access_end );
	}).volatile(),


	openBrowser( url ) {
		const channel = get( this, "channel.name" );

		return openBrowser( url, {
			channel
		});
	},


	actions: {
		edit() {
			return this.openBrowser( subscriptionEditUrl );
		},

		cancel() {
			return this.openBrowser( subscriptionCancelUrl );
		}
	}
});
