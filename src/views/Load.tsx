/*
• Build src/views/Load.tsx to export a functional component that keeps typedText in state, uses useEffect with setInterval to append characters from 'sudo
loadPortfolio.exe', clears the timer when finished, and optionally blinks a cursor span.
• Update src/App.tsx to import Load and return <Load /> so the loader view is rendered at the root; remove unused useState boilerplate.
• Use src/App.css (or a new module imported by Load) to center the loader: apply min-height: 100vh, display: flex, align-items/justify-content: center,
text-align: center, and a monospaced font on a full-screen container.
• Add typing visuals by styling the text span with white-space: nowrap, letter-spacing, and a pseudo-element or separate <span> for the blinking cursor (CSS
@keyframes blink { opacity: ... }).
• Ensure body in src/index.css remains display: flex; place-items: center; min-height: 100vh; so the loader is vertically centered even before React mounts, and
confirm colors/fonts match the existing JetBrains Mono + dark palette.
 */

function Load() {
 return (<><p>sudo loadPortfolio.exe</p></>) 
}

export default Load;
