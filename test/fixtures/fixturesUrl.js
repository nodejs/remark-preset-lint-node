// At the time of writing, ESLint doesn't support `import.meta`. This file
// serves as a proxy to access import.meta.url in other files without making
// ESLint parser throw on valid syntax.
export default import.meta.url;
