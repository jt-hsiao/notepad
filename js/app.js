$(document).ready(function () {
	const toastLinks = [
		{
			text: "Support Notepad's sustainable development — Buy me a coffee! ❤️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "Liking the recent updates lately? Buy me a coffee to keep them coming!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "I work on this app in my spare time. Buy me a coffee for your support!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "If this app saves you time, a coffee is a nice way to say thanks!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: true
		},
		{
			text: "This app runs without ads. If you value that, buy me a coffee.",
			url: "https://buymeacoffee.com/amitmerchant",
			active: true
		},
		{
			text: "Buy me a coffee so that I don't have to rely on ads to run this app.",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "🎉 Happy New Year! If this app made your year a little easier, you can buy me a coffee ☕️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "This app is intentionally kept ad-free. If you appreciate that, buy me a coffee. Thank you! ❤️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "I strive to craft this app to perfection. If you admire the effort, consider buying me a coffee!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "Thank you for using this app. If you’d like to support the development, buy me a coffee.",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "If you enjoy using this app, consider buying me a coffee to support it! ❤️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "Your support keeps this app going — leave a tip if you can! ❤️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "Love the ad-free experience? Buy me a coffee to keep it that way!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "I hate ads on my Notepad. If you feel the same, consider buying me a coffee! ❤️",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "Send anonymous feature suggestions",
			url: "https://docs.google.com/forms/d/1NuSl4FzUXRR6maOaGNfUmBdNJ-l9neBzzp_JwDm3xZI",
			active: false
		},
		{
			text: "We rely on the supporters like you to keep Notepad thriving!",
			url: "https://buymeacoffee.com/amitmerchant",
			active: false
		},
		{
			text: "🚀 New tool → Case Converter",
			url: "/case-converter",
			active: false
		},
		{
			isFeature: true,
			isActive: true,
			text: "New → Mimic typewriter sound when typing. Enable it from the Preferences popup.",
			url: "#preferencesModal",
			dataTarget: "#preferencesModal",
			active: false
		}
	];

	// Function to show a random link
	function showRandomToastLink() {
		const activeLinks = toastLinks.filter(link => link.active);
		const randomIndex = Math.floor(Math.random() * activeLinks.length);
		const link = activeLinks[randomIndex];

		if (!link) {
			return;
		}

		$('#toastText').text(link.text);
		$('#toastLink').attr('href', link.url);
		$('#toastPopup').addClass('show');

		if (link.isFeature && link.isActive) {
			$('#toastLink').attr('data-target', link.dataTarget);
			$('#toastLink').attr('data-toggle', 'modal');
			$('#toastLink').removeAttr('target');
		}
	}

	// Function to close toast with animation
	function closeToastPopup() {
		const $toast = $('#toastPopup');
		$toast.addClass('hide');
		setTimeout(function () {
			$toast.removeClass('show hide');
		}, 500);
	}

	// Close toast popup
	$('#closeToastPopup').on('click', function () {
		closeToastPopup();
	});
	
	// Close toast popup when link is clicked
	$('#toastLink').on('click', function () {
		closeToastPopup();
	});
	
	// Toast popup disabled
	// setTimeout(showRandomToastLink, 5000);
	
	// Setup coffee icon hover animation
	setupCoffeeIconAnimation();

	const welcomeText = `Welcome! This is an offline-capable Notepad which is a Progressive Web App.

The app serves the following features:

- Your notes are saved in real-time as you type.
- Installable on supported browsers for offline usage.
- "Add To Home Screen" feature on Android-supported devices to launch the app from the home screen.
- Dark mode.
- Privacy-focused - Never collects your precious data.
- Light-weight - Loads almost instantly.
- Writing timer.
- View Note Statistics.
- Snapshots.
- Ability to mimic typewriter sound when typing.
- Keyboard shortcuts for common actions.
- Focus mode to leave you with a barebones and pristine editor.
- Full-screen mode for a distraction-free writing experience.
- Floating window (in supported browsers) to effectively take notes across other apps.
- Download notes as plain text, PDF, HTML, and DOCX file.
- Ability to play ambient noise to help you focus.
- It's proudly open-source!

CAUTION: Since the app uses the browser's localStorage to store your notes, 
it's recommended that you take a backup of your notes more often using the 
"Download Notes" button or by pressing the "ctrl/command + s" keys.

Lastly, if you're using Notepad, and want to support the development, 
you can buy me a coffee — the link of which is available in the About section.

** Delete this text and start writing your notes **`;

	const darkmodeText = 'Enable dark mode [Ctrl/Cmd + M]';
	const lightmodeText = 'Enable light mode [Ctrl/Cmd + M]';
	const darkMetaColor = '#0d1117';
	const lightMetaColor = '#4d4d4d';
	const metaThemeColor = document.querySelector('meta[name=theme-color]');
	const { notepad, state, setState, removeState, get } = selector();
	const optimalLineLengthPadding = '15px 15vw 40px';

	const editorConfig = selector().defaultConfig;

	const themeConfig = {
		lightmodeText,
		darkmodeText,
		lightMetaColor,
		darkMetaColor,
		metaThemeColor
	};

	const noteItem = state.note && state.note != '' ? state.note : welcomeText;
	const characterAndWordCountText = calculateCharactersAndWords(noteItem);

	let typewriterSoundEnabled;
	const typeSound = new Audio('/sounds/typewriter/typewriter-key-press-02.mp3');
	const carriageReturnSound = new Audio('/sounds/typewriter/typewriter-carriage-return-01.mp3');
	const spacebarSound = new Audio('/sounds/typewriter/space.mp3');

	typeSound.volume = 0.2; // keep it subtle
	const userChosenTypewriterSound = state.userChosenTypewriterSound;
	const userChosenTypewriterVolume = state.userChosenTypewriterVolume;
	const userChosenExplodingEffect = state.userChosenExplodingEffect;

	let explodingEffectEnabled;
	let keyburstLayer = $('#keyburstLayer');
	let pendingKeyburst = false;
	let pendingKeyburstTarget = null;

	if (keyburstLayer.length === 0) {
		keyburstLayer = $('<div id="keyburstLayer" aria-hidden="true"></div>');
		$('body').append(keyburstLayer);
	}

	const keyburstColors = ['#ff4d6d', '#ffe66d', '#6bffb4', '#6bb7ff', '#d06bff', '#ff9f6b'];
	const keyburstParticleCount = 8;
	const keyburstMirrorProps = [
		'direction',
		'boxSizing',
		'overflowX',
		'overflowY',
		'borderTopWidth',
		'borderRightWidth',
		'borderBottomWidth',
		'borderLeftWidth',
		'borderTopStyle',
		'borderRightStyle',
		'borderBottomStyle',
		'borderLeftStyle',
		'paddingTop',
		'paddingRight',
		'paddingBottom',
		'paddingLeft',
		'fontStyle',
		'fontVariant',
		'fontWeight',
		'fontStretch',
		'fontSize',
		'lineHeight',
		'fontFamily',
		'textAlign',
		'textTransform',
		'textIndent',
		'letterSpacing',
		'wordSpacing',
		'tabSize',
		'textRendering'
	];

	function getCaretClientPosition(textarea) {
		if (!textarea || typeof textarea.selectionStart !== 'number') {
			return null;
		}

		let mirror = textarea._caretMirror;

		if (!mirror) {
			mirror = document.createElement('div');
			mirror.setAttribute('aria-hidden', 'true');
			document.body.appendChild(mirror);
			textarea._caretMirror = mirror;
		}

		const computed = window.getComputedStyle(textarea);
		const rect = textarea.getBoundingClientRect();

		keyburstMirrorProps.forEach((prop) => {
			mirror.style[prop] = computed[prop];
		});

		mirror.style.position = 'absolute';
		mirror.style.top = '0px';
		mirror.style.left = '-9999px';
		mirror.style.whiteSpace = 'pre-wrap';
		mirror.style.wordWrap = 'break-word';
		mirror.style.overflow = 'hidden';
		mirror.style.visibility = 'hidden';
		mirror.style.pointerEvents = 'none';
		const paddingLeft = parseFloat(computed.paddingLeft) || 0;
		const paddingRight = parseFloat(computed.paddingRight) || 0;
		const contentWidth = Math.max(0, textarea.clientWidth - paddingLeft - paddingRight);

		mirror.style.boxSizing = 'content-box';
		mirror.style.width = `${contentWidth}px`;
		mirror.style.height = `${textarea.clientHeight}px`;

		const value = textarea.value;
		const caretIndex = textarea.selectionStart;
		const textBefore = value.substring(0, caretIndex);
		const textAfter = value.substring(caretIndex);

		mirror.textContent = textBefore;

		const span = document.createElement('span');
		span.textContent = textAfter || '.';
		mirror.appendChild(span);

		const borderLeft = parseFloat(computed.borderLeftWidth) || 0;
		const borderTop = parseFloat(computed.borderTopWidth) || 0;
		const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) || 16;
		const left = rect.left + span.offsetLeft + borderLeft - textarea.scrollLeft;
		const top = rect.top + span.offsetTop + borderTop - textarea.scrollTop;

		return {
			left,
			top,
			height: lineHeight
		};
	}

	function triggerKeyburst(textarea) {
		if (!keyburstLayer.length) {
			return;
		}

		const caret = getCaretClientPosition(textarea);

		if (!caret) {
			return;
		}

		const baseX = caret.left;
		const baseY = caret.top + caret.height * 0.6;
		const layer = keyburstLayer[0];

		for (let i = 0; i < keyburstParticleCount; i++) {
			const particle = document.createElement('span');
			const angle = Math.random() * Math.PI * 2;
			const distance = 12 + Math.random() * 22;
			const size = 3 + Math.random() * 4;
			const color = keyburstColors[Math.floor(Math.random() * keyburstColors.length)];

			particle.className = 'keyburst-particle';
			particle.style.left = `${baseX}px`;
			particle.style.top = `${baseY}px`;
			particle.style.width = `${size}px`;
			particle.style.height = `${size}px`;
			particle.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
			particle.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
			particle.style.setProperty('--burst-color', color);

			layer.appendChild(particle);
			particle.addEventListener('animationend', () => {
				particle.remove();
			});
		}
	}

	// Initialize typewriter sound preference
	if (!userChosenTypewriterSound) {
		typewriterSoundEnabled = editorConfig.defaultTypewriterSound;
		$('#typewriterSound').prop('checked', typewriterSoundEnabled);
	} else {
		typewriterSoundEnabled = userChosenTypewriterSound == 'Yes';
		$('#typewriterSound').prop('checked', typewriterSoundEnabled);
	}

	if (typewriterSoundEnabled) {
		$('.typewriter-switch-volume').show();
	} else {
		$('.typewriter-switch-volume').hide();
	}

	if (!userChosenTypewriterVolume) {
		$('#typewriterVolume').val(editorConfig.defaultTypewriterVolume);
		$('#typewriterVolumeValue').text(editorConfig.defaultTypewriterVolume + '%');
	}else {
		$('#typewriterVolume').val(userChosenTypewriterVolume);
		$('#typewriterVolumeValue').text(userChosenTypewriterVolume + '%');
	}

	// Initialize explosion effect preference
	if (!userChosenExplodingEffect) {
		explodingEffectEnabled = editorConfig.defaultExplodingEffect;
		$('#explodingEffect').prop('checked', explodingEffectEnabled);
	} else {
		explodingEffectEnabled = userChosenExplodingEffect == 'Yes';
		$('#explodingEffect').prop('checked', explodingEffectEnabled);
	}
	
	function playTypeSound() {
		if (!typewriterSoundEnabled) return;
		
		// Clone so rapid typing doesn't cut the previous sound
		const s = typeSound.cloneNode();

		// Add random pitch for realism (±5% variation)
		s.playbackRate = 0.95 + Math.random() * 0.1;
		const currentVolume = localStorage.getItem('userChosenTypewriterVolume');
		s.volume = currentVolume ? (currentVolume / 100) : (editorConfig.defaultTypewriterVolume / 100);
		s.play();
	}

	notepad.note.on('keydown', (e) => {
		const shouldExplode = explodingEffectEnabled
			&& !e.ctrlKey
			&& !e.metaKey
			&& !e.altKey
			&& (e.key.length === 1 || e.key === 'Enter');

		if (shouldExplode) {
			pendingKeyburst = true;
			pendingKeyburstTarget = e.target;
		}

		if (e.key === 'Enter') {
			if (typewriterSoundEnabled) {
				const s = carriageReturnSound.cloneNode();
				const currentVolume = localStorage.getItem('userChosenTypewriterVolume');
				s.volume = currentVolume ? (currentVolume / 100) : (editorConfig.defaultTypewriterVolume / 100);
				s.play();
			}

			return;
		} else if (e.key === ' ') {
			if (typewriterSoundEnabled) {
				const s = spacebarSound.cloneNode();
				const currentVolume = localStorage.getItem('userChosenTypewriterVolume');
				s.volume = currentVolume ? (currentVolume / 100) : (editorConfig.defaultTypewriterVolume / 100);
				s.play();
			}

			return;
		}

		const isPrintable = (
			// Single character keys (letters, numbers, symbols)
			e.key.length === 1 || 
			// Common editing keys
			[
				'Delete', 'Backspace', 'Enter', ' ', 'Space', 
				'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
				'Home', 'End', 'PageUp', 'PageDown'
			].includes(e.key) ||
			// Mobile-specific keys and special cases
			e.key === 'Unidentified' ||  // Some mobile keyboards
			e.key === 'Process' ||       // Some IME inputs
			e.key === 'Dead' ||          // Dead keys (for accents)
			e.key === 'Compose'          // Compose key
		);

		if (isPrintable) {
			playTypeSound();
		}
	});

	notepad.note.on('input', (e) => {
		if (!explodingEffectEnabled) {
			pendingKeyburst = false;
			pendingKeyburstTarget = null;
			return;
		}

		const inputType = (e.originalEvent && e.originalEvent.inputType) ? e.originalEvent.inputType : e.inputType;
		const isInsert = pendingKeyburst || (inputType && inputType.startsWith('insert') && inputType !== 'insertFromPaste' && inputType !== 'insertFromDrop');

		if (!isInsert) {
			pendingKeyburst = false;
			pendingKeyburstTarget = null;
			return;
		}

		const target = pendingKeyburstTarget || e.target;
		pendingKeyburst = false;
		pendingKeyburstTarget = null;

		requestAnimationFrame(() => {
			triggerKeyburst(target);
		});
	});

	// Handle typewriter sound toggle
	$('#typewriterSound').on('change', function() {
		const isEnabled = $(this).is(':checked');
		localStorage.setItem('userChosenTypewriterSound', isEnabled ? 'Yes' : 'No');
		typewriterSoundEnabled = isEnabled;

		if (isEnabled) {
			$('.typewriter-switch-volume').show();
		} else {
			$('.typewriter-switch-volume').hide();
		}
	});

	// Handle explosion effect toggle
	$('#explodingEffect').on('change', function() {
		const isEnabled = $(this).is(':checked');
		setState('userChosenExplodingEffect', isEnabled ? 'Yes' : 'No');
		explodingEffectEnabled = isEnabled;
	});

	// Handle typewriter volume change
	let volumePreviewTimer = null;
	$('#typewriterVolume').on('input', function() {
		const volume = $(this).val();
		localStorage.setItem('userChosenTypewriterVolume', volume);

		if (typewriterSoundEnabled) {
			typeSound.volume = volume / 100;
			carriageReturnSound.volume = volume / 100;
			$('#typewriterVolumeValue').text(volume + '%');
		}

		// Clear previous preview timer
		clearTimeout(volumePreviewTimer);

		// Set new preview timer (user stopped sliding for 500ms)
		volumePreviewTimer = setTimeout(() => {
			playTypeSound();
		}, 500);
	});

	notepad.wordCount.text(characterAndWordCountText);
	notepad.note.val(noteItem);

	$('[data-toggle="tooltip"]').tooltip();

	if (!state.isUserPreferredTheme) {
		setState('isUserPreferredTheme', 'false');
	}

	if (state.userChosenFontSize) {
		notepad.note.css('font-size', state.userChosenFontSize + 'px');
		notepad.fontSize.val(state.userChosenFontSize);
	} else {
		resetFontSize(editorConfig.defaultFontSize);
	}

	if (state.userChosenFontWeight) {
		notepad.note.css('font-weight', state.userChosenFontWeight);
		notepad.fontWeight.val(state.userChosenFontWeight);
	} else {
		resetFontWeight(editorConfig.defaultFontWeight);
	}

	if (state.userChosenLineHeight) {
		notepad.note.css('line-height', state.userChosenLineHeight + 'px');
		notepad.lineHeight.val(state.userChosenLineHeight);
	} else {
		resetLineHeight(editorConfig.defaultLineHeight);
	}

	const userChosenWordCountPillSelected = state.userChosenWordCountPillSelected

	if (userChosenWordCountPillSelected) {
		if (userChosenWordCountPillSelected === 'Yes') {
			notepad.wordCountContainer.show();
			notepad.frostedGlassPillPref.show();
		} else {
			notepad.wordCountContainer.hide();
			notepad.frostedGlassPillPref.hide();
		}
		notepad.showWordCountPill.prop('checked', userChosenWordCountPillSelected === 'Yes');
	} else {
		notepad.wordCountContainer.show();
		notepad.frostedGlassPillPref.show();
		notepad.showWordCountPill.prop('checked', true);
	}

	const userChosenTransparentWordCountPillSelected = state.userChosenTransparentWordCountPillSelected;

	if (userChosenTransparentWordCountPillSelected) {
		userChosenTransparentWordCountPillSelected === 'Yes' ? notepad.wordCountContainer.addClass('transparency') : notepad.wordCountContainer.removeClass('transparency');
		notepad.transparentWordCountPill.prop('checked', userChosenTransparentWordCountPillSelected === 'Yes');
	} else {
		notepad.wordCountContainer.removeClass('transparency');
		notepad.transparentWordCountPill.prop('checked', false);
	}

	if (state.userChosenWriteDirection) {
		notepad.note.css('direction', state.userChosenWriteDirection);
		notepad.writeDirection.val(state.userChosenWriteDirection);
	} else {
		resetWriteDirection(editorConfig.defaultWriteDirection);
	}

	if (state.userChosenTexture) {
		const allowedTextures = ['normal', 'dotted', 'graph', 'grain', 'linen', 'recycled', 'newspaper', 'marble'];

		if (allowedTextures.includes(state.userChosenTexture)) {
			$(document.body).removeClass('dotted-paper graph-paper grain-paper linen-paper recycled-paper newspaper-paper marble-paper');

			if (state.userChosenTexture == 'dotted') {
				$(document.body).addClass('dotted-paper');
			} else if (state.userChosenTexture == 'graph') {
				$(document.body).addClass('graph-paper');
			} else if (state.userChosenTexture == 'grain') {
				$(document.body).addClass('grain-paper');
			} else if (state.userChosenTexture == 'linen') {
				$(document.body).addClass('linen-paper');
			} else if (state.userChosenTexture == 'recycled') {
				$(document.body).addClass('recycled-paper');
			} else if (state.userChosenTexture == 'newspaper') {
				$(document.body).addClass('newspaper-paper');
			} else if (state.userChosenTexture == 'marble') {
				$(document.body).addClass('marble-paper');
			}

			notepad.texture.val(state.userChosenTexture);
		} else {
			removeState('userChosenTexture');
			resetTexture(editorConfig.defaultTexture);
		}
	}

	if (state.userChosenOptimalLineLengthSelected) {
		const textArea = document.getElementById('note');

		if (state.userChosenOptimalLineLengthSelected === 'Yes') {
			textArea.style.padding = optimalLineLengthPadding;
		} else {
			textArea.style.padding = editorConfig.defaultOptimalLineLengthPadding;
		}

		notepad.optimalLineLength.prop('checked', state.userChosenOptimalLineLengthSelected === 'Yes');
	} else {
		notepad.optimalLineLength.prop('checked', false);
	}

	if (state.userChosenSpellCheck) {
		if (state.userChosenSpellCheck === 'Yes') {
			notepad.note.attr('spellcheck', true);
		} else {
			notepad.note.attr('spellcheck', false);
		}

		notepad.spellCheck.prop('checked', state.userChosenSpellCheck === 'Yes');
	} else {
		notepad.spellCheck.prop('checked', true);
	}

	if (state.userChosenTabIndentation) {
		notepad.tabIndentation.prop('checked', state.userChosenTabIndentation === 'Yes');
	} else {
		notepad.tabIndentation.prop('checked', false);
	}

	if (state.mode && state.mode === 'dark') {
		enableDarkMode(lightmodeText, darkMetaColor, metaThemeColor);

		$('input[name="themes"][value="dark"]').prop('checked', true);
	} else if (state.mode && state.mode === 'light') {
		enableLightMode(darkmodeText, lightMetaColor, metaThemeColor);

		$('input[name="themes"][value="light"]').prop('checked', true);	
	} else {
		enableDeviceTheme(themeConfig);

		$('input[name="themes"][value="device"]').prop('checked', true);
	}

	const themeRadios = document.querySelectorAll('input[name="themes"]');

    themeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            switch (event.target.value) {
				case 'dark':
					enableDarkMode(lightmodeText, darkMetaColor, metaThemeColor);
					break;
				case 'light':
					enableLightMode(darkmodeText, lightMetaColor, metaThemeColor);
					break;
				case 'device':
					enableDeviceTheme(themeConfig);
					break;
			}
        });
    });

	notepad.note.on('input', debounce(function () {
		setState(noteKey, get(this).val());
		updateWordCountPill(get(this).val());
	}, 500));

	// Roman numeral conversion helpers
	function romanToInt(s) {
		var map = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };
		var result = 0;
		s = s.toLowerCase();
		for (var j = 0; j < s.length; j++) {
			var cur = map[s[j]];
			var nxt = j + 1 < s.length ? map[s[j + 1]] : 0;
			result += cur < nxt ? -cur : cur;
		}
		return result;
	}

	function intToRoman(num) {
		var vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
		var syms = ['m', 'cm', 'd', 'cd', 'c', 'xc', 'l', 'xl', 'x', 'ix', 'v', 'iv', 'i'];
		var result = '';
		for (var j = 0; j < vals.length; j++) {
			while (num >= vals[j]) {
				result += syms[j];
				num -= vals[j];
			}
		}
		return result;
	}

	// List type definitions for ordered and unordered list support
	// Order matters: Roman numerals are checked before single-letter alpha
	// so that "i. " matches as Roman I, not alpha "i".
	var ROMAN_LOWER_RE = /^(\s*)(x{0,3}(?:i{1,3}|iv|vi{0,3}|ix)|x{1,3})\. /;
	var ROMAN_LOWER_PAREN_RE = /^(\s*)(x{0,3}(?:i{1,3}|iv|vi{0,3}|ix)|x{1,3})\) /;
	var ROMAN_UPPER_RE = /^(\s*)(X{0,3}(?:I{1,3}|IV|VI{0,3}|IX)|X{1,3})\. /;
	var ROMAN_UPPER_PAREN_RE = /^(\s*)(X{0,3}(?:I{1,3}|IV|VI{0,3}|IX)|X{1,3})\) /;

	var LIST_TYPES = [
		{
			pattern: /^(\s*)(\d+)\. /,
			ordered: true,
			getIndex: function (m) { return parseInt(m[2]) - 1; },
			format: function (indent, i) { return indent + (i + 1) + '. '; }
		},
		{
			pattern: /^(\s*)(\d+)\) /,
			ordered: true,
			getIndex: function (m) { return parseInt(m[2]) - 1; },
			format: function (indent, i) { return indent + (i + 1) + ') '; }
		},
		{
			pattern: ROMAN_LOWER_RE,
			ordered: true,
			getIndex: function (m) { return romanToInt(m[2]) - 1; },
			format: function (indent, i) { return indent + intToRoman(i + 1) + '. '; }
		},
		{
			pattern: ROMAN_LOWER_PAREN_RE,
			ordered: true,
			getIndex: function (m) { return romanToInt(m[2]) - 1; },
			format: function (indent, i) { return indent + intToRoman(i + 1) + ') '; }
		},
		{
			pattern: ROMAN_UPPER_RE,
			ordered: true,
			getIndex: function (m) { return romanToInt(m[2]) - 1; },
			format: function (indent, i) { return indent + intToRoman(i + 1).toUpperCase() + '. '; }
		},
		{
			pattern: ROMAN_UPPER_PAREN_RE,
			ordered: true,
			getIndex: function (m) { return romanToInt(m[2]) - 1; },
			format: function (indent, i) { return indent + intToRoman(i + 1).toUpperCase() + ') '; }
		},
		{
			pattern: /^(\s*)([a-z])\. /,
			ordered: true,
			getIndex: function (m) { return m[2].charCodeAt(0) - 97; },
			format: function (indent, i) { return indent + String.fromCharCode(97 + (i % 26)) + '. '; }
		},
		{
			pattern: /^(\s*)([a-z])\) /,
			ordered: true,
			getIndex: function (m) { return m[2].charCodeAt(0) - 97; },
			format: function (indent, i) { return indent + String.fromCharCode(97 + (i % 26)) + ') '; }
		},
		{
			pattern: /^(\s*)([A-Z])\. /,
			ordered: true,
			getIndex: function (m) { return m[2].charCodeAt(0) - 65; },
			format: function (indent, i) { return indent + String.fromCharCode(65 + (i % 26)) + '. '; }
		},
		{
			pattern: /^(\s*)([A-Z])\) /,
			ordered: true,
			getIndex: function (m) { return m[2].charCodeAt(0) - 65; },
			format: function (indent, i) { return indent + String.fromCharCode(65 + (i % 26)) + ') '; }
		},
		{
			pattern: /^(\s*)[-] /,
			ordered: false,
			getIndex: function () { return 0; },
			format: function (indent) { return indent + '- '; }
		},
		{
			pattern: /^(\s*)\* /,
			ordered: false,
			getIndex: function () { return 0; },
			format: function (indent) { return indent + '* '; }
		},
		{
			pattern: /^(\s*)\+ /,
			ordered: false,
			getIndex: function () { return 0; },
			format: function (indent) { return indent + '+ '; }
		}
	];

	function matchListItem(line) {
		for (var i = 0; i < LIST_TYPES.length; i++) {
			var match = line.match(LIST_TYPES[i].pattern);
			if (match) {
				return { type: LIST_TYPES[i], match: match, indent: match[1], markerLength: match[0].length };
			}
		}
		return null;
	}

	function getLineIndex(lines, charPos) {
		var pos = 0;
		for (var i = 0; i < lines.length; i++) {
			if (pos + lines[i].length >= charPos) return i;
			pos += lines[i].length + 1;
		}
		return lines.length - 1;
	}

	function getLineStartPos(lines, lineIdx) {
		var pos = 0;
		for (var i = 0; i < lineIdx; i++) {
			pos += lines[i].length + 1;
		}
		return pos;
	}

	function findAndRenumberBlock(lines, lineIdx) {
		if (lineIdx < 0 || lineIdx >= lines.length) return;
		var item = matchListItem(lines[lineIdx]);
		if (!item || !item.type.ordered) return;

		var indent = item.indent;
		var indentLen = indent.length;
		var patternSrc = item.type.pattern.source;

		function isSameLevel(line) {
			var m = matchListItem(line);
			return m && m.type.pattern.source === patternSrc && m.indent === indent;
		}

		function isDeeperIndent(line) {
			if (line.trim() === '') return false;
			var m = matchListItem(line);
			if (m) return m.indent.length > indentLen;
			return line.match(/^(\s*)/)[1].length > indentLen;
		}

		// Find block boundaries, skipping deeper-indented lines (sub-items)
		// Only empty lines or same/shallower non-matching lines break the block
		var blockStart = lineIdx;
		while (blockStart > 0) {
			var prev = lines[blockStart - 1];
			if (prev.trim() === '') break;
			if (isSameLevel(prev) || isDeeperIndent(prev)) blockStart--;
			else break;
		}

		var blockEnd = lineIdx;
		while (blockEnd < lines.length - 1) {
			var next = lines[blockEnd + 1];
			if (next.trim() === '') break;
			if (isSameLevel(next) || isDeeperIndent(next)) blockEnd++;
			else break;
		}

		// Renumber only same-level items, skipping sub-items
		var num = 0;
		for (var i = blockStart; i <= blockEnd; i++) {
			var mi = matchListItem(lines[i]);
			if (!mi || mi.type.pattern.source !== patternSrc || mi.indent !== indent) continue;
			var content = lines[i].substring(mi.markerLength);
			lines[i] = mi.type.format(indent, num) + content;
			num++;
		}
	}

	// Apply a full-text replacement to the textarea, preserving undo history
	function applyTextChange(textarea, newValue, cursorStart, cursorEnd) {
		textarea.setSelectionRange(0, textarea.value.length);
		document.execCommand('insertText', false, newValue);
		textarea.setSelectionRange(cursorStart, cursorEnd);
		setState(noteKey, newValue);
		updateWordCountPill(newValue);
	}

	// Detect the indent unit (e.g., 4 spaces or 1 tab) used in the document
	function detectIndentUnit(lines) {
		var min = null;
		for (var i = 0; i < lines.length; i++) {
			var m = matchListItem(lines[i]);
			if (m && m.indent.length > 0) {
				if (min === null || m.indent.length < min.length) {
					min = m.indent;
				}
			}
		}
		return min || '\t';
	}

	// Find an existing ordered list type at a given indent level near lineIdx
	function findNearbyListType(lines, lineIdx, targetIndent) {
		var targetLen = targetIndent.length;
		for (var i = lineIdx - 1; i >= 0; i--) {
			if (lines[i].trim() === '') break;
			var m = matchListItem(lines[i]);
			if (m && m.indent === targetIndent && m.type.ordered) return m.type;
			if (m && m.indent.length <= targetLen && m.indent !== targetIndent) break;
		}
		for (var i = lineIdx + 1; i < lines.length; i++) {
			if (lines[i].trim() === '') break;
			var m = matchListItem(lines[i]);
			if (m && m.indent === targetIndent && m.type.ordered) return m.type;
			if (m && m.indent.length <= targetLen && m.indent !== targetIndent) break;
		}
		return null;
	}

	// Determine list type family (numeric, alpha-lower, roman-lower, etc.)
	function getTypeFamily(type) {
		if (!type.ordered) return 'unordered';
		if (type.pattern === ROMAN_LOWER_RE || type.pattern === ROMAN_LOWER_PAREN_RE) return 'roman-lower';
		if (type.pattern === ROMAN_UPPER_RE || type.pattern === ROMAN_UPPER_PAREN_RE) return 'roman-upper';
		var src = type.pattern.source;
		if (src.indexOf('\\d') !== -1) return 'numeric';
		if (src.indexOf('a-z') !== -1) return 'alpha-lower';
		if (src.indexOf('A-Z') !== -1) return 'alpha-upper';
		return 'numeric';
	}

	function getTypeSuffix(type) {
		return type.pattern.source.indexOf('\\)') !== -1 ? ')' : '.';
	}

	function findListType(family, suffix) {
		for (var i = 0; i < LIST_TYPES.length; i++) {
			if (LIST_TYPES[i].ordered && getTypeFamily(LIST_TYPES[i]) === family && getTypeSuffix(LIST_TYPES[i]) === suffix) {
				return LIST_TYPES[i];
			}
		}
		return LIST_TYPES[0];
	}

	// Default sub/parent type cycle: numeric → alpha-lower → roman-lower → numeric
	var SUB_FAMILY = { 'numeric': 'alpha-lower', 'alpha-lower': 'roman-lower', 'roman-lower': 'numeric', 'alpha-upper': 'roman-upper', 'roman-upper': 'alpha-upper' };
	var PARENT_FAMILY = { 'alpha-lower': 'numeric', 'roman-lower': 'alpha-lower', 'numeric': 'roman-lower', 'roman-upper': 'alpha-upper', 'alpha-upper': 'roman-upper' };

	function getDefaultSubType(type) {
		return findListType(SUB_FAMILY[getTypeFamily(type)] || 'alpha-lower', getTypeSuffix(type));
	}

	function getDefaultParentType(type) {
		return findListType(PARENT_FAMILY[getTypeFamily(type)] || 'numeric', getTypeSuffix(type));
	}

	notepad.note.keydown(function (e) {
		var tabIndentation = notepad.tabIndentation.prop('checked');

		if (e.key === "Tab") {
			var textarea = e.target;
			var value = textarea.value;
			var start = textarea.selectionStart;
			var end = textarea.selectionEnd;
			var allLines = value.split('\n');
			var startLine = getLineIndex(allLines, start);
			var endLine = getLineIndex(allLines, end);
			if (end > start && endLine > startLine && end === getLineStartPos(allLines, endLine)) endLine--;

			// Check if all selected lines are ordered list items
			var allOrdered = true;
			var firstItem = null;
			for (var li = startLine; li <= endLine; li++) {
				var chk = matchListItem(allLines[li]);
				if (!chk || !chk.type.ordered) { allOrdered = false; break; }
				if (li === startLine) firstItem = chk;
			}

			if (allOrdered && firstItem) {
				// List-aware Tab: change indent level + marker type
				e.preventDefault();

				var indentUnit = detectIndentUnit(allLines);
				var firstLineStart = getLineStartPos(allLines, startLine);
				var cursorContentOffset = Math.max(0, start - firstLineStart - firstItem.markerLength);

				for (var li = startLine; li <= endLine; li++) {
					var mi = matchListItem(allLines[li]);
					if (!mi || !mi.type.ordered) continue;
					var content = allLines[li].substring(mi.markerLength);

					if (e.shiftKey) {
						if (mi.indent.length === 0) continue;
						var newIndent = mi.indent.length >= indentUnit.length
							? mi.indent.substring(0, mi.indent.length - indentUnit.length) : '';
						var newType = findNearbyListType(allLines, li, newIndent) || getDefaultParentType(mi.type);
						allLines[li] = newType.format(newIndent, 0) + content;
					} else {
						var newIndent = mi.indent + indentUnit;
						var newType = findNearbyListType(allLines, li, newIndent) || getDefaultSubType(mi.type);
						allLines[li] = newType.format(newIndent, 0) + content;
					}
				}

				// Renumber all affected levels
				for (var li = startLine; li <= endLine; li++) {
					findAndRenumberBlock(allLines, li);
				}
				if (startLine > 0) findAndRenumberBlock(allLines, startLine - 1);
				if (endLine < allLines.length - 1) findAndRenumberBlock(allLines, endLine + 1);

				var newValue = allLines.join('\n');
				var newFirstItem = matchListItem(allLines[startLine]);
				var newFirstLineStart = getLineStartPos(allLines, startLine);
				var newCursorPos = newFirstLineStart + (newFirstItem ? newFirstItem.markerLength : 0) + cursorContentOffset;
				newCursorPos = Math.max(0, Math.min(newCursorPos, newValue.length));

				applyTextChange(textarea, newValue, newCursorPos, newCursorPos);
			} else if (tabIndentation) {
				// Non-list: existing tab behavior
				e.preventDefault();
				var tabCharacter = "\t";

				if (start === end) {
					document.execCommand("insertText", false, tabCharacter);
					textarea.selectionStart = textarea.selectionEnd = start + tabCharacter.length;
				} else {
					var selectedText = value.substring(start, end);
					var selLines = selectedText.split("\n");

					if (e.shiftKey) {
						var unindentedLines = selLines.map(function (line) {
							return line.startsWith(tabCharacter) ? line.substring(tabCharacter.length) : line;
						});
						document.execCommand("insertText", false, unindentedLines.join("\n"));
					} else {
						var indentedLines = selLines.map(function (line) { return tabCharacter + line; });
						document.execCommand("insertText", false, indentedLines.join("\n"));
					}
				}
			}
		}

		// Enter key: Auto-continue list items
		// Skip if modifier keys are held (Shift+Enter = plain newline) or during IME composition
		if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey && !e.isComposing) {
			var textarea = e.target;
			var originalValue = textarea.value;
			var selStart = textarea.selectionStart;
			var selEnd = textarea.selectionEnd;

			// Remove selected text from computation
			var value = selStart !== selEnd
				? originalValue.substring(0, selStart) + originalValue.substring(selEnd)
				: originalValue;

			var lines = value.split('\n');
			var currentLineIdx = getLineIndex(lines, selStart);
			var currentLine = lines[currentLineIdx];
			var item = matchListItem(currentLine);

			if (item) {
				var lineStartPos = getLineStartPos(lines, currentLineIdx);
				var cursorInLine = selStart - lineStartPos;

				// Only intercept if cursor is at or past the marker end
				if (cursorInLine >= item.markerLength) {
					var contentAfterMarker = currentLine.substring(item.markerLength);

					e.preventDefault();

					if (contentAfterMarker.trim() === '') {
						// Empty list item → exit the list (remove marker)
						lines[currentLineIdx] = '';
						if (currentLineIdx + 1 < lines.length) {
							findAndRenumberBlock(lines, currentLineIdx + 1);
						}

						var newValue = lines.join('\n');
						applyTextChange(textarea, newValue, lineStartPos, lineStartPos);
					} else {
						// Split at cursor, create new list item
						var beforeCursor = currentLine.substring(0, cursorInLine);
						var afterCursor = currentLine.substring(cursorInLine);

						var currentIndex = item.type.getIndex(item.match);
						var nextMarker = item.type.format(item.indent, currentIndex + 1);

						lines[currentLineIdx] = beforeCursor;
						lines.splice(currentLineIdx + 1, 0, nextMarker + afterCursor);

						// Renumber the block from the new line onwards
						findAndRenumberBlock(lines, currentLineIdx + 1);

						var newValue = lines.join('\n');

						// Position cursor right after the marker on the new line
						var newLineStartPos = getLineStartPos(lines, currentLineIdx + 1);
						var newItem = matchListItem(lines[currentLineIdx + 1]);
						var newCursorPos = newLineStartPos + (newItem ? newItem.markerLength : nextMarker.length);

						applyTextChange(textarea, newValue, newCursorPos, newCursorPos);
					}
				}
			}
		}

		// Option/Alt + ArrowUp/ArrowDown: Move line(s) up/down
		if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
			e.preventDefault();

			var textarea = e.target;
			var value = textarea.value;
			var selStart = textarea.selectionStart;
			var selEnd = textarea.selectionEnd;
			var lines = value.split('\n');
			var movingUp = e.key === 'ArrowUp';

			var startLineIdx = getLineIndex(lines, selStart);
			var endLineIdx = getLineIndex(lines, selEnd);

			// If selection ends exactly at the start of a line, exclude that line
			if (selEnd > selStart && endLineIdx > startLineIdx) {
				if (selEnd === getLineStartPos(lines, endLineIdx)) {
					endLineIdx--;
				}
			}

			// Boundary checks
			if (movingUp && startLineIdx === 0) return;
			if (!movingUp && endLineIdx >= lines.length - 1) return;

			// Record cursor offsets relative to the selected block's start
			var blockStartPos = getLineStartPos(lines, startLineIdx);
			var selStartOffset = selStart - blockStartPos;
			var selEndOffset = selEnd - blockStartPos;

			// Swap lines
			if (movingUp) {
				var removed = lines.splice(startLineIdx - 1, 1)[0];
				lines.splice(endLineIdx, 0, removed);
				startLineIdx--;
				endLineIdx--;
			} else {
				var removed = lines.splice(endLineIdx + 1, 1)[0];
				lines.splice(startLineIdx, 0, removed);
				startLineIdx++;
				endLineIdx++;
			}

			// Renumber ordered list items in affected blocks
			findAndRenumberBlock(lines, startLineIdx);
			if (movingUp) {
				findAndRenumberBlock(lines, endLineIdx + 1);
			} else {
				findAndRenumberBlock(lines, startLineIdx - 1);
			}

			// Reconstruct text
			var newValue = lines.join('\n');

			// Calculate new cursor position
			var newBlockStartPos = getLineStartPos(lines, startLineIdx);
			var newSelStart = Math.max(0, Math.min(newBlockStartPos + selStartOffset, newValue.length));
			var newSelEnd = Math.max(0, Math.min(newBlockStartPos + selEndOffset, newValue.length));

			// Apply using execCommand to preserve undo history
			applyTextChange(textarea, newValue, newSelStart, newSelEnd);
		}
	});

	notepad.clearNotes.on('click', function () {
		deleteNotes();
	});

	notepad.copyToClipboard.click(function () {
		copyNotesToClipboard(notepad.note.val());
	})

	notepad.downloadNotes.click(function (e) {
		e.stopPropagation(); // Stop click event from bubbling
		$('#iconDropdown').toggleClass('show');
		$('#moreToolsDropdown').removeClass('show');
	})

	notepad.moreTools.click(function (e) {
		e.stopPropagation(); // Stop click event from bubbling
		$('#moreToolsDropdown').toggleClass('show');
		$('#iconDropdown').removeClass('show');
	})

	notepad.downloadNotesPlain.click(function (e) {
		saveTextAsFile(note.value, getFileName());
	});

	notepad.downloadNotesPdf.click(function (e) {
		exportNotesAsPDF(note.value, getPdfFileName());
	});

	notepad.downloadNotesDocx.click(function (e) {
		const textToWrite = note.value;
		const fileNameToSaveAs = getDocxFileName();

		exportNotesAsDocx(textToWrite, fileNameToSaveAs);
	});

	notepad.downloadNotesHtml.click(function (e) {
		const textToWrite = note.value;
		const fileNameToSaveAs = getHtmlFileName();

		downloadHTML(textToWrite, fileNameToSaveAs);
	});

	// Close dropdown if clicked outside
	$(document).on('click', function () {
		$('#iconDropdown').removeClass('show');
		$('#moreToolsDropdown').removeClass('show');
	});

	notepad.fullScreenButton.click(function () {
		toggleFullScreen();
	})

	notepad.focusModeButton.click(function () {
		toggleFocusMode(notepad);
	})

	notepad.focusModeCloseButton.click(function () {
		turnOffFocusMode(notepad);
	})

	// Default to Focus Mode ON
	toggleFocusMode(notepad);

	// Update statistics when modal is shown
	notepad.statisticsModal.on('show.bs.modal', function () {
		const noteText = notepad.note.val();
		const stats = calculateNoteStatistics(noteText);

		$('#statWords').text(stats.words);
		$('#statCharacters').text(stats.characters);
		$('#statSentences').text(stats.sentences);
		$('#statParagraphs').text(stats.paragraphs);
		$('#statAvgWordLength').text(stats.averageWordLength);
		$('#statReadingTime').text(stats.readingTime);
		$('#statUniqueWords').text(stats.uniqueWords);
		$('#statMostCommonWord').text(stats.mostCommonWord);
	});

	notepad.closeDonationPopup.click(function () {
		notepad.stickyNotice.remove();
		setState('hasUserDismissedDonationPopup', 'true');
	});

	notepad.fontSize.on('change', function (e) {
		const fontSizeSelected = this.value;

		notepad.note.css('font-size', fontSizeSelected + 'px');
		setState('userChosenFontSize', fontSizeSelected);
	});

	notepad.lineHeight.on('change', function (e) {
		const lineHeightSelected = this.value;

		notepad.note.css('line-height', lineHeightSelected + 'px');
		setState('userChosenLineHeight', lineHeightSelected);
	});

	notepad.fontWeight.on('change', function (e) {
		const fontWeightSelected = this.value;

		notepad.note.css('font-weight', fontWeightSelected);
		setState('userChosenFontWeight', fontWeightSelected);
	});

	notepad.writeDirection.on('change', function (e) {
		const writeDirectionSelected = this.value;

		notepad.note.css('direction', writeDirectionSelected);
		setState('userChosenWriteDirection', writeDirectionSelected);
	});

	notepad.texture.on('change', function (e) {
		const textureSelected = this.value;

		$(document.body).removeClass('dotted-paper graph-paper grain-paper linen-paper recycled-paper newspaper-paper marble-paper');

		if (textureSelected == 'dotted') {
			$(document.body).addClass('dotted-paper');
		} else if (textureSelected == 'graph') {
			$(document.body).addClass('graph-paper');
		} else if (textureSelected == 'grain') {
			$(document.body).addClass('grain-paper');
		} else if (textureSelected == 'linen') {
			$(document.body).addClass('linen-paper');
		} else if (textureSelected == 'recycled') {
			$(document.body).addClass('recycled-paper');
		} else if (textureSelected == 'newspaper') {
			$(document.body).addClass('newspaper-paper');
		} else if (textureSelected == 'marble') {
			$(document.body).addClass('marble-paper');
		}

		setState('userChosenTexture', textureSelected);
	});

	notepad.showWordCountPill.on('change', function (e) {
		if ($(this).is(':checked')) {
			notepad.wordCountContainer.show();
			notepad.frostedGlassPillPref.show();
			setState('userChosenWordCountPillSelected', 'Yes');
		} else {
			notepad.wordCountContainer.hide();
			notepad.frostedGlassPillPref.hide();
			setState('userChosenWordCountPillSelected', 'No');
		}
	});

	notepad.transparentWordCountPill.on('change', function (e) {
		if ($(this).is(':checked')) {
			notepad.wordCountContainer.addClass('transparency');
			setState('userChosenTransparentWordCountPillSelected', 'Yes');
		} else {
			notepad.wordCountContainer.removeClass('transparency');
			setState('userChosenTransparentWordCountPillSelected', 'No');
		}
	});

	notepad.optimalLineLength.on('change', function (e) {
		const textArea = document.getElementById('note');

		if ($(this).is(':checked')) {
			textArea.style.padding = optimalLineLengthPadding;
			setState('userChosenOptimalLineLengthSelected', 'Yes');
		} else {
			textArea.style.padding = editorConfig.defaultOptimalLineLengthPadding;
			setState('userChosenOptimalLineLengthSelected', 'No');
		}
	})

	notepad.spellCheck.on('change', function (e) {
		if ($(this).is(':checked')) {
			notepad.note.attr('spellcheck', true);
			setState('userChosenSpellCheck', 'Yes');
		} else {
			notepad.note.attr('spellcheck', false);
			setState('userChosenSpellCheck', 'No');
		}
	})

	notepad.tabIndentation.on('change', function (e) {
		if ($(this).is(':checked')) {
			setState('userChosenTabIndentation', 'Yes');
		} else {
			setState('userChosenTabIndentation', 'No');
		}
	})

	notepad.resetPreferences.click(function () {
		if (selector().state.userChosenFontSize) {
			removeState('userChosenFontSize');
			resetFontSize(editorConfig.defaultFontSize);
		}

		if (selector().state.userChosenLineHeight) {
			removeState('userChosenLineHeight');
			resetLineHeight(editorConfig.defaultLineHeight);
		}

		if (selector().state.userChosenFontWeight) {
			removeState('userChosenFontWeight');
			resetFontWeight(editorConfig.defaultFontWeight);
		}

		if (selector().state.userChosenWordCountPillSelected) {
			removeState('userChosenWordCountPillSelected');
			resetShowWordCountPill(editorConfig.defaultShowWordCountPill);
		}

		if (selector().state.userChosenWriteDirection) {
			removeState('userChosenWriteDirection');
			resetWriteDirection(editorConfig.defaultWriteDirection);
		}

		if (selector().state.userChosenTexture) {
			removeState('userChosenTexture');
			resetTexture(editorConfig.defaultTexture);
		}

		if (selector().state.userChosenOptimalLineLengthSelected) {
			removeState('userChosenOptimalLineLengthSelected');
			resetOptimalLineLength(editorConfig.defaultOptimalLineLengthPadding, editorConfig.defaultOptimalLineLength);
		}

		if (selector().state.selectedFont) {
			removeState('selectedFont');
			resetFont(editorConfig.defaultFont);
		}

		if (selector().state.userChosenSpellCheck) {
			removeState('userChosenSpellCheck');
			notepad.note.attr('spellcheck', false);
			notepad.spellCheck.prop('checked', editorConfig.defaultSpellCheck);
		}

		if (selector().state.userChosenTabIndentation) {
			removeState('userChosenTabIndentation');
			notepad.tabIndentation.prop('checked', editorConfig.defaultTabIndentation);
		}

		if (selector().state.userChosenTransparentWordCountPillSelected) {
			removeState('userChosenTransparentWordCountPillSelected');
			notepad.wordCountContainer.removeClass('transparency')
			notepad.transparentWordCountPill.prop('checked', editorConfig.defaultTransparentWordCountPillSelected);
		}

		if (selector().state.userChosenTypewriterSound) {
			removeState('userChosenTypewriterSound');
			typewriterSoundEnabled = editorConfig.defaultTypewriterSound;
			$('#typewriterSound').prop('checked', typewriterSoundEnabled);
			$('.typewriter-switch-volume').hide();
		}

		if (selector().state.userChosenTypewriterVolume) {
			removeState('userChosenTypewriterVolume');
			$('#typewriterVolume').val(editorConfig.defaultTypewriterVolume);
			$('#typewriterVolumeValue').text(editorConfig.defaultTypewriterVolume + '%');
		}

		if (selector().state.userChosenExplodingEffect) {
			removeState('userChosenExplodingEffect');
			explodingEffectEnabled = editorConfig.defaultExplodingEffect;
			$('#explodingEffect').prop('checked', explodingEffectEnabled);
		}

		// Reset to device theme as default
		$('input[name="themes"][value="device"]').prop('checked', true);
		enableDeviceTheme(themeConfig);
	});

	if (navigator.share && window.self === window.top) {
		$('#shareNotesContainer').show();
	}

	notepad.shareNotes.click(function (e) {
		e.stopPropagation();
		const textToShare = note.value;
		shareNotes(textToShare);
	});

	const pipButton = document.getElementById('pip');

	// Only show the Picture-in-Picture 
	// button if the browser supports it
	if ('documentPictureInPicture' in window) {
		$('#pipContainer').show();

		pipButton.addEventListener('click', async () => {
			const appTextarea = document.getElementById("textareaContainer");

			// Open a Picture-in-Picture window.
			const pipWindow = await documentPictureInPicture.requestWindow({
				width: 350,
				height: 500,
			});

			[...document.styleSheets].forEach((styleSheet) => {
				try {
					const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
					const style = document.createElement('style');

					style.textContent = cssRules;
					pipWindow.document.head.appendChild(style);
				} catch (e) {
					const link = document.createElement('link');

					link.rel = 'stylesheet';
					link.type = styleSheet.type;
					link.media = styleSheet.media;
					link.href = styleSheet.href;
					pipWindow.document.head.appendChild(link);
				}
			});

			// Move the textarea to the Picture-in-Picture window.
			pipWindow.document.body.append(appTextarea);

			// Move the textarea back when the Picture-in-Picture window closes.
			pipWindow.addEventListener("pagehide", (event) => {
				const mainContainer = document.querySelector("#mainContainer");
				const textareaContainer = event.target.querySelector("#textareaContainer");
				const overlay = document.querySelector(".overlay");
				mainContainer.append(textareaContainer);
				mainContainer.classList.remove("pip");

				overlay.style.display = "none";
				overlay.style.pointerEvents = "none";

				textareaContainer.classList.remove("dark");
			});
		});

		documentPictureInPicture.addEventListener("enter", (event) => {
			const playerContainer = document.querySelector("#mainContainer");
			const textareaContainer = document.querySelector("#textareaContainer");
			const overlay = document.querySelector(".overlay");

			playerContainer.classList.add("pip");
			overlay.style.display = "block";
			overlay.style.pointerEvents = "all";
			
			// Stop the writing timer 
			// if it is running (js/timer.js)
			if (timerConfig.timer) {
				stopTimer();
			}

			if (localStorage.getItem('mode') && localStorage.getItem('mode') == 'dark') {
				textareaContainer.classList.add("dark");
			}

			if (localStorage.getItem('mode') && localStorage.getItem('mode') == 'device' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				textareaContainer.classList.add("dark");
			}
		});
	}

	// This changes the application's theme when 
	// user toggles device's theme preference
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (state.mode && state.mode === 'device') {
			enableDeviceTheme(themeConfig);
		}
	});

	// This hides the install app button 
	// if the app is already installed
	if (getPWADisplayMode() === 'standalone') {
		notepad.installApp.hide();
	}

	window.matchMedia('(display-mode: standalone)').addEventListener('change', ({ matches }) => {
		if (matches) {
			notepad.installApp.hide();
		} else {
			notepad.installApp.show();
		}
	});

	// This listens for keyboard shortcuts
	document.onkeydown = function (event) {
		event = event || window.event;

		if (event.key === 'Escape') {
			$('.modal').modal('hide');
			$('#iconDropdown').removeClass('show');
			$('#moreToolsDropdown').removeClass('show');
			turnOffFocusMode(notepad);
		}

		if ((event.ctrlKey || event.metaKey) && event.code === 'KeyS') {
			saveTextAsFile(note.value, getFileName());
			event.preventDefault();
		}

		if (event.altKey && event.code === 'KeyS') {
			exportNotesAsPDF(note.value, getPdfFileName());
			event.preventDefault();
		}

		if ((event.ctrlKey || event.metaKey) && event.code === 'Comma') {
			event.preventDefault();

			if (notepad.preferencesModal.hasClass('in'))
				return;

			$('.modal').modal('hide');
			notepad.preferencesModal.modal('show');
		}

		if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
			event.preventDefault();

			if (notepad.keyboardShortcutsModal.hasClass('in'))
				return;

			$('.modal').modal('hide');
			notepad.keyboardShortcutsModal.modal('show');
		}

		if (event.altKey && event.code === 'KeyC') {
			event.preventDefault();
			copyNotesToClipboard(notepad.note.val());
		}

		if (event.ctrlKey && event.code === 'Delete') {
			event.preventDefault();
			deleteNotes();
		}

		if (event.altKey && event.code === 'KeyF') {
			event.preventDefault();

			toggleFocusMode(notepad);
		}
	};

	// Font selection handler
	const fontSelect = document.getElementById('font');
	
	// Check for legacy font preferences and migrate them to the new system
	function migrateLegacyFontPrefs() {
		const dyslexicFont = localStorage.getItem('dyslexicFont') === 'true';
		const monospacedFont = localStorage.getItem('monospaced') === 'true';
		const serifFont = localStorage.getItem('serifFont') === 'true';
		
		if (dyslexicFont) {
			localStorage.setItem('selectedFont', 'dyslexic');
		} else if (monospacedFont) {
			localStorage.setItem('selectedFont', 'monospaced');
		} else if (serifFont) {
			localStorage.setItem('selectedFont', 'serif');
		} else {
			localStorage.setItem('selectedFont', 'default');
		}
		
		// Clear old preferences
		localStorage.removeItem('dyslexicFont');
		localStorage.removeItem('monospaced');
		localStorage.removeItem('serifFont');
	}
	
	// Apply font based on selection
	function applyFont(fontType) {
		// Remove all font classes first
		notepad.note.removeClass('dyslexic monospaced serif handwritten humanist pixel');
		
		// Add the selected font class
		switch(fontType) {
			case 'dyslexic':
				notepad.note.addClass('dyslexic');
				break;
			case 'monospaced':
				notepad.note.addClass('monospaced');
				break;
			case 'serif':
				notepad.note.addClass('serif');
				break;
			case 'handwritten':
				notepad.note.addClass('handwritten');
				break;
			case 'humanist':
				notepad.note.addClass('humanist');
				break;
			case 'pixel':
				notepad.note.addClass('pixel');
				break;
			// 'default' case doesn't need any class
		}
	}
	
	// Initialize font selection
	function initFontSelection() {
		// Migrate legacy preferences if needed
		if (localStorage.getItem('dyslexicFont') !== null || 
			localStorage.getItem('monospaced') !== null || 
			localStorage.getItem('serifFont') !== null) {
			migrateLegacyFontPrefs();
		}
		
		// Get the selected font or default to 'default'
		const selectedFont = localStorage.getItem('selectedFont') || 'default';
		
		// Set the dropdown value
		fontSelect.value = selectedFont;
		
		// Apply the font
		applyFont(selectedFont);
	}
	
	// Handle font selection change
	fontSelect.addEventListener('change', (e) => {
		const selectedFont = e.target.value;
		localStorage.setItem('selectedFont', selectedFont);
		applyFont(selectedFont);
	});
	
	// Initialize font selection on page load
	initFontSelection();
});

document.addEventListener("fullscreenchange", function () {
	if (!document.fullscreenElement) {
		$('#arrowPointsIn').hide();
		$('#arrowPointsOut').show();
	}
});

// Registering ServiceWorker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then(function (registration) {
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	}).catch(function (err) {
		console.log('ServiceWorker registration failed: ', err);
	});
}

let deferredPrompt;
let installSource;

window.addEventListener('beforeinstallprompt', (e) => {
	selector().notepad.installAppButtonContainer.show();
	deferredPrompt = e;
	installSource = 'nativeInstallCard';

	e.userChoice.then(function (choiceResult) {
		if (choiceResult.outcome === 'accepted') {
			deferredPrompt = null;
		}

		ga('send', {
			hitType: 'event',
			eventCategory: 'pwa-install',
			eventAction: 'native-installation-card-prompted',
			eventLabel: installSource,
			eventValue: choiceResult.outcome === 'accepted' ? 1 : 0
		});
	});
});

const installApp = document.getElementById('installApp');

installApp.addEventListener('click', async () => {
	installSource = 'customInstallationButton';

	if (deferredPrompt !== null) {
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			deferredPrompt = null;
		}

		ga('send', {
			hitType: 'event',
			eventCategory: 'pwa-install',
			eventAction: 'custom-installation-button-clicked',
			eventLabel: installSource,
			eventValue: outcome === 'accepted' ? 1 : 0
		});
	} else {
		showToast('Notepad is already installed.')
	}
});

window.addEventListener('appinstalled', () => {
	deferredPrompt = null;

	const source = installSource || 'browser';

	ga('send', 'event', 'pwa-install', 'installed', source);
});