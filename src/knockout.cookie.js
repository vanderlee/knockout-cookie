(function (ko, undefined) {
	var setCookie = function (key, value, expireDays) {
						var expires = new Date();
						if (expireDays === undefined) {
							expireDays = 365;
						}
						expires.setTime(expires.getTime() + (expireDays * 24 * 60 * 60 * 1000));
						var expires = "expires=" + expires.toUTCString();
						document.cookie = key + "=" + value + ";" + expires + ";path=/";
					},
		getCookie = function (key) {
						var name = key + "=",
							cookies = decodeURIComponent(document.cookie).split(';');
						for (var c = 0; c < cookies.length; c++) {
							var cookie = cookies[c];
							while (cookie.charAt(0) === ' ') {
								cookie = cookie.substring(1);
							}
							if (cookie.indexOf(name) == 0) {
								return cookie.substring(name.length, cookie.length);
							}
						}
					};

	ko.extenders.cookie = function (target, key) {
		var initialValue = target();

		if (key && getCookie(key) !== undefined) {
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
