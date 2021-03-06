import {
	get,
	inject,
	Service
} from "ember";
import nwWindow, {
	toggleVisibility,
	toggleMaximized,
	toggleMinimized
} from "nwjs/Window";


const { service } = inject;


export default Service.extend({
	modal: service(),
	settings: service(),
	streaming: service(),


	reload() {
		nwWindow.reloadIgnoringCache();
	},

	devTools() {
		nwWindow.showDevTools();
	},

	minimize() {
		let integration    = get( this, "settings.gui_integration" );
		let minimizetotray = get( this, "settings.gui_minimizetotray" );

		// tray only or both with min2tray: just hide the window
		if ( integration === 2 || integration === 3 && minimizetotray ) {
			toggleVisibility();
		} else {
			toggleMinimized();
		}
	},

	maximize() {
		toggleMaximized();
	},

	close() {
		const streams = get( this, "streaming.model" ).toArray();
		if ( streams.length && streams.some( stream => !get( stream, "hasEnded" ) ) ) {
			get( this, "modal" ).openModal( "quit", this );
		} else {
			this.quit();
		}
	},

	quit() {
		process.exit();
	}
});
