//#region node_modules/@marker.io/browser/lib/esm/index.mjs
/**
* Marker.io - https://marker.io
* Browser loader for the Marker.io SDK
*/
var markerSDK = { loadWidget(params) {
	const knownParams = [
		"destination",
		"project",
		"reporter",
		"customShimUrl",
		"customData",
		"useNativeScreenshot",
		"silent",
		"source",
		"ssr",
		"extension",
		"keyboardShortcuts",
		"beta",
		"demo",
		"networkRecording"
	];
	Object.keys(params).forEach((paramName) => {
		if (!knownParams.includes(paramName)) console.warn("(Marker.io SDK) unknown param \"" + paramName + "\" (need to upgrade?)");
	});
	const { reporter, customData, silent, ssr, extension, keyboardShortcuts, beta, demo, networkRecording, useNativeScreenshot } = params;
	const project = params.project || params.destination;
	if (typeof project !== "string") throw new Error("project must be a string");
	if ("customData" in params && typeof customData !== "object") throw new Error("customData must be an object");
	if ("silent" in params && typeof silent !== "boolean") throw new Error("silent must be a boolean");
	if ("ssr" in params && typeof ssr !== "object") throw new Error("ssr must be an object");
	if ("useNativeScreenshot" in params && typeof useNativeScreenshot !== "boolean") throw new Error("useNativeScreenshot must be a boolean");
	if ("extension" in params && typeof extension !== "boolean" && typeof extension !== "object") throw new Error("extension must be a boolean/object");
	if ("beta" in params && typeof beta !== "object") throw new Error("extension must be a boolean/object");
	if ("keyboardShortcuts" in params && typeof keyboardShortcuts !== "boolean") throw new Error("keyboardShortcuts must be a boolean");
	if ("demo" in params && typeof demo !== "boolean") throw new Error("demo must be a boolean/object");
	if ("networkRecording" in params && typeof networkRecording !== "object") throw new Error("networkRecording must be a object");
	if (window.Marker) window.Marker.unload();
	window.markerConfig = {
		project,
		reporter,
		customData,
		silent,
		ssr,
		extension,
		keyboardShortcuts,
		useNativeScreenshot,
		beta,
		demo,
		networkRecording,
		source: "browser-sdk"
	};
	const __cs = [];
	const sdk = { __cs };
	for (const methodName of [
		"show",
		"hide",
		"isVisible",
		"capture",
		"cancelCapture",
		"unload",
		"reload",
		"isExtensionInstalled",
		"setReporter",
		"clearReporter",
		"setCustomData",
		"setNetworkRecordingSettings",
		"on",
		"off"
	]) sdk[methodName] = function() {
		const t = Array.prototype.slice.call(arguments);
		t.unshift(methodName);
		__cs.push(t);
	};
	window.Marker = sdk;
	const script = document.createElement("script");
	script.async = true;
	script.src = params.customShimUrl || "https://edge.marker.io/latest/shim.js";
	const anchorScript = document.getElementsByTagName("script")[0];
	if (anchorScript.parentNode) anchorScript.parentNode.insertBefore(script, anchorScript);
	else (document.body || document.head).appendChild(script);
	return new Promise((resolve, reject) => {
		sdk.on("load", () => {
			resolve(window.Marker);
		});
		sdk.on("loaderror", (error) => {
			reject(error);
		});
		script.onerror = (error) => reject(error);
	});
} };
//#endregion
export { markerSDK as default };

//# sourceMappingURL=@marker__io_browser.js.map