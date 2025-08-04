// Vercel Deployment Verification Script
// Run this in browser console on your deployed site

console.clear();
console.log('%c🚀 Yamaha Bahrain - Deployment Verification', 'font-size: 20px; color: #dc2626; font-weight: bold');
console.log('=====================================');

// 1. Check Environment
console.group('📍 Environment Info');
console.log('URL:', window.location.href);
console.log('Host:', window.location.hostname);
console.log('Protocol:', window.location.protocol);
console.log('User Agent:', navigator.userAgent);
console.groupEnd();

// 2. Check CSS Loading
console.group('🎨 CSS Analysis');
const stylesheets = Array.from(document.styleSheets);
console.log('Total Stylesheets:', stylesheets.length);

stylesheets.forEach((sheet, index) => {
  try {
    const rules = sheet.cssRules || sheet.rules;
    console.log(`Sheet ${index + 1}:`, {
      href: sheet.href || 'inline',
      rules: rules ? rules.length : 'N/A',
      disabled: sheet.disabled
    });
  } catch (e) {
    console.log(`Sheet ${index + 1}: CORS blocked or empty`);
  }
});

// Check computed styles
const bodyStyles = window.getComputedStyle(document.body);
const rootStyles = window.getComputedStyle(document.documentElement);

console.log('\n📊 Computed Styles:');
console.table({
  'Body Background': bodyStyles.backgroundColor,
  'Body Color': bodyStyles.color,
  'Root Background': rootStyles.backgroundColor,
  'HTML Classes': document.documentElement.className,
  'Body Classes': document.body.className
});
console.groupEnd();

// 3. Check Tailwind
console.group('🎯 Tailwind CSS Check');
const testEl = document.createElement('div');
testEl.className = 'bg-red-500 text-white p-4';
document.body.appendChild(testEl);
const testStyles = window.getComputedStyle(testEl);

const tailwindWorks = {
  'Background (red-500)': testStyles.backgroundColor,
  'Text Color (white)': testStyles.color,
  'Padding': testStyles.padding,
  'Works': testStyles.backgroundColor.includes('239') || testStyles.backgroundColor.includes('220')
};

console.table(tailwindWorks);
document.body.removeChild(testEl);
console.groupEnd();

// 4. Check React
console.group('⚛️ React App Status');
const rootElement = document.getElementById('root');
console.log('Root Element:', rootElement ? 'Found' : 'NOT FOUND');
console.log('Root Children:', rootElement ? rootElement.children.length : 0);
console.log('React Rendered:', rootElement && rootElement.children.length > 0 ? 'Yes' : 'No');
console.groupEnd();

// 5. Network Check
console.group('🌐 Network Resources');
const cssRequests = performance.getEntriesByType('resource')
  .filter(entry => entry.name.includes('.css'));

console.log('CSS Files Loaded:');
cssRequests.forEach(req => {
  console.log(`- ${req.name.split('/').pop()}: ${req.duration.toFixed(2)}ms`);
});
console.groupEnd();

// 6. Recommendations
console.group('💡 Diagnosis');
const issues = [];

if (!bodyStyles.backgroundColor.includes('10, 10, 10')) {
  issues.push('❌ Dark theme not applied correctly');
}
if (stylesheets.length === 0) {
  issues.push('❌ No stylesheets loaded');
}
if (!tailwindWorks.Works) {
  issues.push('❌ Tailwind CSS not working');
}
if (!rootElement || rootElement.children.length === 0) {
  issues.push('❌ React app not rendering');
}

if (issues.length > 0) {
  console.log('%c⚠️ Issues Found:', 'color: orange; font-weight: bold');
  issues.forEach(issue => console.log(issue));
  
  console.log('\n%c🔧 Quick Fix:', 'color: green; font-weight: bold');
  console.log('Run this to force dark theme:');
  console.log(`
document.body.style.backgroundColor = '#0A0A0A';
document.body.style.color = '#FFFFFF';
document.documentElement.style.backgroundColor = '#0A0A0A';
document.documentElement.classList.add('dark');
  `);
} else {
  console.log('%c✅ Everything looks good!', 'color: green; font-weight: bold');
}
console.groupEnd();

console.log('=====================================');
console.log('%c📝 Report generated at:', 'font-weight: bold', new Date().toLocaleString());