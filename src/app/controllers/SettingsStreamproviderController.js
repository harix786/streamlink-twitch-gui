import {
	get,
	computed,
	Controller
} from "ember";
import { streamprovider } from "config";
import Settings from "models/localstorage/Settings";
import { platform } from "utils/node/platform";


const { providers } = streamprovider;


function settingsAttrMeta( attr, prop ) {
	return computed(function() {
		return Settings.metaForProperty( attr ).options[ prop ];
	});
}


export default Controller.extend({
	Settings,
	platform,
	streamproviders: providers,

	streamprovidersDropDown: computed(function() {
		return Object.keys( providers )
			// exclude unsupported providers
			.filter( id => providers[ id ][ "exec" ][ platform ] )
			.map( id => ({
				id,
				label: providers[ id ][ "label" ]
			}) );
	}),

	streamproviderName: computed( "model.streamprovider", function() {
		let streamprovider = get( this, "model.streamprovider" );

		return providers[ streamprovider ][ "name" ];
	}),


	hlsLiveEdgeDefault: settingsAttrMeta( "hls_live_edge", "defaultValue" ),
	hlsLiveEdgeMin    : settingsAttrMeta( "hls_live_edge", "min" ),
	hlsLiveEdgeMax    : settingsAttrMeta( "hls_live_edge", "max" ),

	hlsSegmentThreadsDefault: settingsAttrMeta( "hls_segment_threads", "defaultValue" ),
	hlsSegmentThreadsMin    : settingsAttrMeta( "hls_segment_threads", "min" ),
	hlsSegmentThreadsMax    : settingsAttrMeta( "hls_segment_threads", "max" ),

	retryStreamsDefault: settingsAttrMeta( "retry_streams", "defaultValue" ),
	retryStreamsMin    : settingsAttrMeta( "retry_streams", "min" ),
	retryStreamsMax    : settingsAttrMeta( "retry_streams", "max" ),

	retryOpenDefault: settingsAttrMeta( "retry_open", "defaultValue" ),
	retryOpenMin    : settingsAttrMeta( "retry_open", "min" ),
	retryOpenMax    : settingsAttrMeta( "retry_open", "max" )
});
