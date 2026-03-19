function getState(state) {
    return localStorage.getItem(state);
}

function setState(state, value) {
    localStorage.setItem(state, value);
}

function removeState(state) {
    localStorage.removeItem(state);
}

// Returns the localStorage key for the current note based on ?id= query param.
// No param or empty → 'note' (backward compatible), otherwise 'note:<id>'.
// Cached at load time since the URL does not change during a session.
const noteKey = (() => {
    const id = new URLSearchParams(window.location.search).get('id');
    return id ? 'note:' + id : 'note';
})();

function selectById(id) {
    return $(`#${id}`);
}

function selectByClassName(className) {
    return $(`.${className}`);
}

function get(context) {
    return $(context);
}

function selector() {
    return {
        notepad: {
            aboutModal: selectById('aboutModal'),
            clearNotes: selectById('clearNotes'),
            closeDonationPopup: selectById('closeDonationPopup'),
            copyToClipboard: selectById('copyToClipboard'),
            downloadNotes: selectById('downloadNotes'),
            moreTools: selectById('moreTools'),
            downloadNotesPlain: selectById('downloadNotesPlain'),
            downloadNotesPdf: selectById('downloadNotesPdf'),
            downloadNotesDocx: selectById('downloadNotesDocx'),
            downloadNotesHtml: selectById('downloadNotesHtml'),
            fontSize: selectById('fontSize'),
            fontWeight: selectById('fontWeight'),
            installApp: selectById('installApp'),
            lineHeight: selectById('lineHeight'),
            writeDirection: selectById('writeDirection'),
            texture: selectById('texture'),
            note: selectById('note'),
            preferencesModal: selectById('preferencesModal'),
            resetPreferences: selectById('resetPreferences'),
            showWordCountPill: selectById('showWordCountPill'),
            transparentWordCountPill: selectById('transparentWordCountPill'),
            frostedGlassPillPref: selectById('frostedGlassPillPref'),
            wordCount: selectById('wordCount'),
            installAppButtonContainer: selectByClassName('install-app-btn-container'),
            stickyNotice: selectByClassName('sticky-notice'),
            wordCountContainer: selectByClassName('word-count-container'),
            keyboardShortcutsModal: selectById('keyboardShortcutsModal'),
            fullScreenButton: selectById('fullScreenButton'),
            optimalLineLength: selectById('optimalLineLength'),
            monospaced: selectById('monospaced'),
            shareNotes: selectById('shareNotes'),
            dyslexic: selectById('dyslexic'),
            spellCheck: selectById('spellCheck'),
            tabIndentation: selectById('tabIndentation'),
            explodingEffect: selectById('explodingEffect'),
            bottomLine: selectByClassName('bottom-line'),
            focusModeButton: selectById('focusModeButton'),
            focusModeCloseButton: selectById('focusModeCloseButton'),
            statisticsModal: selectById('statisticsModal'),
            serif: selectById('serif'),
        },
        state: {
            note: getState(noteKey),
            mode: getState('mode'),
            isUserPreferredTheme: getState('isUserPreferredTheme'),
            userChosenFontSize: getState('userChosenFontSize'),
            userChosenFontWeight: getState('userChosenFontWeight'),
            userChosenLineHeight: getState('userChosenLineHeight'),
            hasUserDismissedDonationPopup: getState('hasUserDismissedDonationPopup'),
            userChosenWordCountPillSelected: getState('userChosenWordCountPillSelected'),
            userChosenWriteDirection: getState('userChosenWriteDirection'),
            userChosenTexture: getState('userChosenTexture'),
            userChosenOptimalLineLengthSelected: getState('userChosenOptimalLineLengthSelected'),
            isMonospaced: getState('monospaced'),
            isDyslexic: getState('dyslexicFont'),
            isSerif: getState('serifFont'),
            userChosenSpellCheck: getState('userChosenSpellCheck'),
            userChosenTabIndentation: getState('userChosenTabIndentation'),
            userChosenTransparentWordCountPillSelected: getState('userChosenTransparentWordCountPillSelected'),
            userChosenTypewriterSound: getState('userChosenTypewriterSound'),
            userChosenTypewriterVolume: getState('userChosenTypewriterVolume'),
            userChosenExplodingEffect: getState('userChosenExplodingEffect'),
            selectedFont: getState('selectedFont')
        },
        defaultConfig: {
            defaultFontSize: 18,
            defaultLineHeight: 26,
            defaultFont: 'default',
            defaultFontWeight: 'normal',
            defaultShowWordCountPill: 'Yes',
            defaultWriteDirection: 'ltr',
            defaultTexture: 'normal',
            defaultOptimalLineLength: false,
            defaultOptimalLineLengthPadding: '15px 24px 40px',
            defaultSpellCheck: true,
            defaultTabIndentation: false,
            defaultTransparentWordCountPillSelected: false,
            defaultTypewriterSound: false,
            defaultTypewriterVolume: 25,
            defaultExplodingEffect: false,
        },
        get,
        getState,
        setState,
        removeState,
        noteKey,
        selectById,
        selectByClassName
    }
}