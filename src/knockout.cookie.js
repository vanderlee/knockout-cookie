(function (ko, undefined) {
	var setCookie = function (cname, cvalue, exdays) {
						var d = new Date();
						if (exdays === undefined) {
							exdays = 365;
						}
						d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
						var expires = "expires=" + d.toUTCString();
						document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
					},
		hasCookie = function (cname) {
						return getCookie(cname) !== undefined;
					},
		getCookie = function (cname) {
						var name = cname + "=";
						var decodedCookie = decodeURIComponent(document.cookie);
						var ca = decodedCookie.split(';');
						for (var i = 0; i < ca.length; i++) {
							var c = ca[i];
							while (c.charAt(0) == ' ') {
								c = c.substring(1);
							}
							if (c.indexOf(name) == 0) {
								return c.substring(name.length, c.length);
							}
						}
					};

	ko.extenders.cookie = function (target, key) {
		var initialValue = target();

		if (key && hasCookie(key) !== null) {
			try {
				initialValue = JSON.parse(getCookie(key));
			} catch (e) {
			}
		}

		target(initialValue);

		target.subscribe(function (newValue) {
			setCookie(key, ko.toJSON(newValue));
		});

		return target;
	};
})(ko);
