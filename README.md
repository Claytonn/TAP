# TAP - Text Area Processor 
#### Text highlighter and HTML formatter. Format textarea inputs with regex patterns.

#### Usage

> tap(element, options);

**element paramenter expects textarea inputs only**

#### Exmaple Usage
```
// Instantiate TAP
var textArea = new tap(element, {

	patterns: [
	{
			regex: ['(@\\w{1,15})', 'gi'], // RegExp [pattern, flag]
			element: 'span', // Wrapping Tag
			attributes: {
				// Element Attributes
				class: 'tap-username'
			}
		},
		{
			regex: ['\\b(bold)\\b', 'gi'],
			element: 'span',
			attributes: {
				class: 'tap-bold'
			}
		},
		{
			regex: ['\\b(italic)\\b', 'gi'],
			element: 'span',
			attributes: {
				class: 'tap-italic'
			}
		},
		{
			regex: ['\\b(blue)\\b', 'gi'], 
			element: 'span',
			attributes: {
				class: 'tap-blue'
			}
		},
		{
			regex: ['\\b(red)\\b', 'gi'],
			element: 'span',
			attributes: {
				class: 'tap-red'
			}
		},
		{
			regex: ['\\b(green)\\b', 'gi'],
			element: 'span',
			attributes: {
				class: 'tap-green'
			}
		},
		{
			regex: ['\\b(link)\\b', 'gi'],
			element: 'a',
			attributes: {
				class: 'tap-link',
				href: 'http://claytonn.com'
			}
		}
		]
	});
```

